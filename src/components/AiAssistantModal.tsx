import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { askOrondoAssistant } from '../services/aiGateway';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (tab: string) => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ 
  isOpen, 
  onClose,
  onNavigate 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your Douglas County Fire District 4 Community Assistant and Site Guide. Ask me about burn ban dates, open burning regulations, our fire stations, volunteer opportunities, or check out our [Wildfire Maps & Public Resources](/resources)!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Where can I see live wildfire maps?',
    'When is the annual burn ban?',
    'What is the 4x4x4 open burning rule?',
    'When do Fire Commissioners meet?',
    'How do I volunteer as a firefighter or EMT?',
    'Where are DCFD4 stations located?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await askOrondoAssistant(text.trim());
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Douglas County Fire District 4 provides 24/7 emergency response. For emergencies dial **911**. To review outdoor burning rules, visit our [Burn Rules & Notice Form](/burn-permits) or call (509) 784-2941.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderBoldText = (text: string, keyPrefix: string): React.ReactNode => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-extrabold text-white">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return <span key={keyPrefix}>{parts}</span>;
  };

  const renderFormattedMessage = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lineIdx} className="h-1.5" />;
      }

      // Check for bullet line
      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
      const cleanLine = isBullet ? trimmed.slice(2) : line;

      // Match markdown links [Title](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = linkRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(renderBoldText(cleanLine.slice(lastIndex, match.index), `${lineIdx}-${lastIndex}`));
        }
        const title = match[1];
        const url = match[2];
        const isInternal = url.startsWith('/');
        const cleanTab = isInternal ? (url.slice(1) || 'home') : '';

        if (isInternal && onNavigate) {
          parts.push(
            <button
              key={`link-${lineIdx}-${match.index}`}
              onClick={() => {
                onNavigate(cleanTab);
                onClose();
              }}
              className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 mx-1 px-2 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition-all text-xs"
              title={`Navigate to ${title}`}
            >
              <span>{title}</span>
              <ArrowUpRight className="w-3 h-3 text-amber-400" />
            </button>
          );
        } else {
          parts.push(
            <a
              key={`link-${lineIdx}-${match.index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-cyan-200 underline underline-offset-2 mx-1 px-2 py-0.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 transition-all text-xs"
              title={`Open ${title}`}
            >
              <span>{title}</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
          );
        }
        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < cleanLine.length) {
        parts.push(renderBoldText(cleanLine.slice(lastIndex), `${lineIdx}-${lastIndex}`));
      }

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 pl-2 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
            <div className="flex-1 leading-relaxed app-text-primary">{parts}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 leading-relaxed app-text-primary">
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl h-[85vh] max-h-[680px] app-card rounded-3xl border app-border shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b app-border app-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full app-surface border border-amber-500/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black app-text-primary text-base sm:text-lg">
                  DCFD4 Community Assistant
                </h3>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  Site Guide & AI
                </span>
              </div>
              <p className="text-[11px] app-text-muted">
                Official guide for burning rules, meetings, stations & wildfire maps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:app-text-primary hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 app-bg">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'app-surface app-text-primary border app-border rounded-bl-none'
                }`}
              >
                {msg.sender === 'bot' ? (
                  renderFormattedMessage(msg.text)
                ) : (
                  <p className="whitespace-pre-line">{msg.text}</p>
                )}
                <span className="block text-[10px] opacity-60 text-right mt-1.5">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full app-surface border app-border text-slate-600 dark:text-slate-300 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 app-text-muted text-xs">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl app-surface border app-border">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500 dark:text-amber-400" />
                <span>Consulting DCFD4 regulations and directory...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompt Chips */}
        <div className="p-3 border-t app-border app-surface overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full app-card hover:bg-slate-200 dark:hover:bg-slate-800 app-text-primary border app-border transition-colors flex-shrink-0 min-h-[32px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t app-border app-surface">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask for burning rules, meeting dates, or pages on this site..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="min-h-[44px] flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 app-text-primary placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white shadow-md transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
