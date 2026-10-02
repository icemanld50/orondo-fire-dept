/**
 * Cloudflare Worker Edge Handler for Douglas County Fire District 4 (DCFD4)
 * Handles Edge Form Routing (/api/submit-form) and serves SPA static assets.
 */

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  DESTINATION_EMAIL?: string; // Default target: info@dcfd4.com
  RESEND_API_KEY?: string;    // Optional transactional email key
  ALERT_WEBHOOK_URL?: string; // Optional Discord/Slack webhook for duty officers
}

interface FormSubmissionPayload {
  formType: 'contact' | 'open_burning' | 'volunteer';
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  burnDate?: string;
  burnType?: string;
  pileDimensionsConfirmed?: boolean;
  waterSupplyConfirmed?: boolean;
  roleInterest?: string[];
  message?: string;
  notes?: string;
  bot_field?: string; // Honeypot spam trap
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Edge API Router
    if (url.pathname === '/api/submit-form' && request.method === 'POST') {
      return handleFormSubmission(request, env, ctx);
    }

    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'healthy', district: 'Douglas County Fire Dist. 4', time: new Date().toISOString() }), {
        headers: CORS_HEADERS,
      });
    }

    // If request is a page route (no file extension and not /api/), serve index.html
    const hasExtension = url.pathname.includes('.');
    if (!url.pathname.startsWith('/api/') && !hasExtension) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
    }

    // Default: Serve Static Assets from Vite /dist
    return env.ASSETS.fetch(request);
  },
};

async function handleFormSubmission(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  try {
    const body: FormSubmissionPayload = await request.json();

    // 1. Honeypot Anti-Spam Check
    if (body.bot_field && body.bot_field.trim() !== '') {
      // Silently accept bots to avoid giving feedback
      return new Response(JSON.stringify({ success: true, referenceCode: 'DCFD4-FILTERED-OK' }), {
        headers: CORS_HEADERS,
      });
    }

    // 2. Validate Required Fields
    if (!body.name || (!body.email && !body.phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields. Full name and email or phone number are required.',
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 3. Generate Official Tracking Reference Code
    const year = new Date().getFullYear();
    const typeCode = body.formType === 'open_burning' ? 'BURN' : body.formType === 'volunteer' ? 'VOL' : 'MSG';
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const referenceCode = `DCFD4-${typeCode}-${year}-${randNum}`;
    const timestamp = new Date().toISOString();

    const targetEmail = env.DESTINATION_EMAIL || 'info@dcfd4.com';

    // 4. Format Submission Details for Dispatch
    const emailSubject = body.formType === 'open_burning'
      ? `[${referenceCode}] ACTION REQUIRED: Burn Request Pending Approval - ${body.name}`
      : `[${referenceCode}] New ${formatFormType(body.formType)} - ${body.name}`;
    const formattedContent = buildEmailContent(body, referenceCode, timestamp);

    console.log(`[FORM_ROUTER] Routing ${referenceCode} to ${targetEmail}`);

    // 5. Dispatch via Resend API (if configured)
    if (env.RESEND_API_KEY) {
      ctx.waitUntil(
        sendViaResend(env.RESEND_API_KEY, targetEmail, emailSubject, formattedContent, body.email)
      );
    }

    // 6. Dispatch via Webhook (if configured)
    if (env.ALERT_WEBHOOK_URL) {
      ctx.waitUntil(
        sendViaWebhook(env.ALERT_WEBHOOK_URL, emailSubject, body, referenceCode)
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        referenceCode,
        timestamp,
        routedTo: targetEmail,
        message: body.formType === 'open_burning'
          ? 'Your burn request has been submitted and is pending dispatch review. Watch your email for approval.'
          : 'Your notice has been processed and routed to DCFD4 station staff.',
      }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error('[FORM_ROUTER_ERROR]', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Edge processing error: ' + (err.message || 'Unknown error'),
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

function formatFormType(type: string): string {
  switch (type) {
    case 'open_burning': return 'Outdoor Burn Notice';
    case 'volunteer': return 'Volunteer Firefighter/EMT Application';
    default: return 'Contact Message';
  }
}

function buildEmailContent(body: FormSubmissionPayload, ref: string, timestamp: string): string {
  return `
==============================================================
DOUGLAS COUNTY FIRE DISTRICT NO. 4 - WEB DISPATCH NOTICE
==============================================================
Reference Code: ${ref}
Timestamp:      ${timestamp}
Type:           ${formatFormType(body.formType)}

APPLICANT / SENDER DETAILS:
--------------------------------------------------------------
Full Name:      ${body.name}
Email:          ${body.email || 'None provided'}
Phone:          ${body.phone || 'None provided'}
Address/Loc:    ${body.address || 'N/A'}

${body.formType === 'open_burning' ? `
BURN DETAILS & APPROVAL STATUS:
--------------------------------------------------------------
Review Status:  PENDING DISPATCH REVIEW (DO NOT BURN UNTIL APPROVED)
Burn Date:      ${body.burnDate || 'Today'}
Burn Type:      ${body.burnType || 'Natural Yard Debris'}
Pile < 4x4x4ft: ${body.pileDimensionsConfirmed ? 'YES (Confirmed)' : 'NO'}
Water on site:  ${body.waterSupplyConfirmed ? 'YES (Confirmed)' : 'NO'}
Notes:          ${body.notes || 'None'}

👉 DISPATCH ACTION REQUIRED:
To APPROVE or DENY this burn request, simply click "Reply" to this 
email and send written authorization directly to: ${body.email || 'None provided'}.
` : ''}

${body.formType === 'volunteer' ? `
VOLUNTEER PREFERENCES:
--------------------------------------------------------------
Roles Selected: ${body.roleInterest?.join(', ') || 'General Firefighter / EMT'}
Message:        ${body.message || 'No additional message'}
` : ''}

${body.formType === 'contact' ? `
MESSAGE CONTENT:
--------------------------------------------------------------
${body.message || 'No message text'}
` : ''}
==============================================================
Douglas County Fire Dist. 4 • Station 241 • Orondo, WA
  `.trim();
}

async function sendViaResend(apiKey: string, to: string, subject: string, text: string, replyTo?: string): Promise<void> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DCFD4 Edge Router <alerts@dcfd4.com>',
        to: [to],
        reply_to: replyTo || undefined,
        subject: subject,
        text: text,
      }),
    });
    if (!res.ok) {
      console.error('[RESEND_ERROR]', await res.text());
    }
  } catch (err) {
    console.error('[RESEND_FETCH_FAILED]', err);
  }
}

async function sendViaWebhook(webhookUrl: string, title: string, body: FormSubmissionPayload, ref: string): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚨 **${title}**\n**Ref:** \`${ref}\`\n**Name:** ${body.name}\n**Contact:** ${body.phone || body.email}\n**Details:** ${body.notes || body.message || 'Notice on file.'}`,
      }),
    });
  } catch (err) {
    console.error('[WEBHOOK_FAILED]', err);
  }
}
