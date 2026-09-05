import React from 'react';
import { 
  Sparkles, 
  Database, 
  Users, 
  Megaphone, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2,
  Lock
} from 'lucide-react';

interface PipelineProgressModalProps {
  isOpen: boolean;
  activeStep: number; // 0: Analyst, 1: Customer, 2: Campaign, 3: Decision Engine, 4: Complete
}

export const PipelineProgressModal: React.FC<PipelineProgressModalProps> = ({
  isOpen,
  activeStep,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: 'Data Analyst Agent',
      desc: 'Scanning 2,341 synthetic transactions, computing recency & failure spikes...',
      icon: Database,
    },
    {
      title: 'Customer Agent (Personalization)',
      desc: 'Analyzing basket co-occurrences (Running shoes vs accessories), cohort affinity...',
      icon: Users,
    },
    {
      title: 'Campaign Agent',
      desc: 'Drafting bounded win-back & payment recovery campaigns with discount caps...',
      icon: Megaphone,
    },
    {
      title: 'Decision Engine (Critic & Policy)',
      desc: 'Validating merchant budget caps (<= ₹10,000) & computing Risk Score (LOW)...',
      icon: ShieldCheck,
    },
    {
      title: 'Approval Gate 🔐',
      desc: 'Gating executable actions behind Merchant Human-in-the-Loop approval...',
      icon: Lock,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ReviveAI Multi-Agent Pipeline
            </h3>
            <p className="text-xs text-slate-500">
              Orchestrating specialist agents with safety policies
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                  isCurrent
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-100'
                    : isDone
                    ? 'bg-slate-50/80 border-emerald-200'
                    : 'bg-white border-slate-100 opacity-40'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-900' : 'text-slate-800'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11px] text-slate-400">
          Enforcing Razorpay test environment compliance &amp; merchant budget limits
        </div>
      </div>
    </div>
  );
};
