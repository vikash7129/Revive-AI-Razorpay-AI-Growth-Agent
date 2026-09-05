import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw,
  Zap,
  HelpCircle
} from 'lucide-react';
import { GrowthOpportunity } from '../types';

interface AiAdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: GrowthOpportunity[];
  onSelectCampaign: (opportunityId: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export const AiAdvisorDrawer: React.FC<AiAdvisorDrawerProps> = ({
  isOpen,
  onClose,
  opportunities,
  onSelectCampaign,
}) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_initial',
      sender: 'assistant',
      text: `Hello! I am **ReviveAI**, your autonomous Razorpay growth agent. I continuously monitor your payment rails, transaction logs, and customer cohorts.

Ask me anything about your revenue, churn risks, or checkout failures!`,
      timestamp: 'Just now',
    },
  ]);

  const presetQuestions = [
    'Mere store mein revenue kaise improve kar sakte hain?',
    'Why did 87 payments fail recently?',
    'Who is Customer B and why are they at risk?',
    'What safe campaign can I run right now?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: 'assistant',
          text: '⚠️ Unable to connect to ReviveAI server. Please check your network or try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>ReviveAI Growth Advisor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </h3>
              <p className="text-[11px] text-slate-500">Powered by Gemini 3.8 Flash &amp; Razorpay Test Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Questions Chips */}
        <div className="p-3 bg-slate-50/60 border-b border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
            Suggested Merchant Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 px-2.5 py-1 rounded-full border border-slate-200 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>ReviveAI is querying store analytics &amp; synthesizing advice...</span>
            </div>
          )}
        </div>

        {/* Action Link to Opportunities */}
        <div className="px-4 py-2.5 bg-blue-50/70 border-t border-blue-100 flex items-center justify-between text-xs text-blue-800">
          <span className="flex items-center gap-1 font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>3 Opportunities Ready for Execution</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onSelectCampaign('opp_win_back_01');
            }}
            className="text-[11px] font-bold underline hover:text-blue-900"
          >
            Review Win-Back &rarr;
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. 'Mere store mein revenue kaise improve karein?')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
