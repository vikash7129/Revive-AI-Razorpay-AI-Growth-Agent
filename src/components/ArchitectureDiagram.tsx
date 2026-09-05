import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Database, 
  Users, 
  Megaphone, 
  Scale, 
  ShieldCheck, 
  Lock, 
  Zap, 
  FileText, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface ArchitectureDiagramProps {
  activeStep?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ activeStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Multi-Agent System Architecture</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Orchestrator + Guardrails
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Analyst, Customer, & Campaign Agents orchestrated with deterministic Risk Gates & Razorpay Test Mode execution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>{isExpanded ? 'Hide Architecture' : 'View Architecture Flow'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
          <div className="min-w-[680px] max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Merchant Node */}
            <div className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              MERCHANT DASHBOARD (Intent Trigger: "Find Growth Opportunities")
            </div>

            {/* Down arrow */}
            <div className="h-5 w-px bg-slate-700 my-1"></div>

            {/* AI Growth Agent Orchestrator */}
            <div className={`px-5 py-2 rounded-lg border font-bold flex items-center gap-2 transition-all ${
              activeStep === 'orchestrator'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                : 'bg-slate-800/90 text-blue-300 border-blue-500/40'
            }`}>
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>ORCHESTRATOR AGENT (Synthesis & Coordination)</span>
            </div>

            {/* Splitter bar */}
            <div className="h-5 w-px bg-slate-700 my-1"></div>
            <div className="w-[540px] h-px bg-slate-700 relative">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-slate-600"></div>
            </div>

            {/* 3 Parallel Specialist Agents */}
            <div className="grid grid-cols-3 gap-4 w-[600px] mt-3">
              {/* Agent 1 */}
              <div className={`p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
                activeStep === 'analyst'
                  ? 'bg-blue-950 border-blue-500 ring-2 ring-blue-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <Database className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="font-bold text-slate-200 text-[11px]">DATA ANALYST AGENT</span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Scans 2,341 txns, flags 126 at-risk (&gt;60d) & 87 payment failures
                </span>
              </div>

              {/* Agent 2 */}
              <div className={`p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
                activeStep === 'customer'
                  ? 'bg-blue-950 border-blue-500 ring-2 ring-blue-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <Users className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="font-bold text-slate-200 text-[11px]">CUSTOMER AGENT</span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Basket affinities (Shoes &rarr; Accessories), bounded discounts
                </span>
              </div>

              {/* Agent 3 */}
              <div className={`p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
                activeStep === 'campaign'
                  ? 'bg-blue-950 border-blue-500 ring-2 ring-blue-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <Megaphone className="w-4 h-4 text-amber-400 mb-1" />
                <span className="font-bold text-slate-200 text-[11px]">CAMPAIGN AGENT</span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Drafts proposals: budget ₹5K, 10% cap, 100 users, 7d duration
                </span>
              </div>
            </div>

            {/* Convergence */}
            <div className="w-[540px] h-px bg-slate-700 mt-3 relative">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-slate-600"></div>
            </div>
            <div className="h-5 w-px bg-slate-700 my-1"></div>

            {/* Decision Engine */}
            <div className="px-5 py-2 rounded-lg bg-indigo-950 border border-indigo-700/80 text-indigo-200 font-bold flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>DECISION ENGINE (Critic & Policy Evaluator)</span>
            </div>

            {/* Two branch gates: Policy vs Approval */}
            <div className="h-5 w-px bg-slate-700 my-1"></div>
            <div className="grid grid-cols-2 gap-6 w-[440px]">
              <div className="p-2.5 rounded-lg bg-slate-800/90 border border-emerald-500/40 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="font-bold text-emerald-300 text-[11px]">1. RISK & POLICY CHECK</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Budget &le; ₹10k | Cap &le; 15% (Passed ✅)</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/90 border border-amber-500/40 text-center">
                <Lock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="font-bold text-amber-300 text-[11px]">2. APPROVAL GATE 🔐</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Human Merchant Sign-Off Required</p>
              </div>
            </div>

            {/* Final execution & Audit */}
            <div className="h-5 w-px bg-slate-700 my-1"></div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-200 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>ACTION: Razorpay Test APIs</span>
              </div>

              <span className="text-slate-500">&rarr;</span>

              <div className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>AUDIT TRAIL (Verifiable Logs)</span>
              </div>

              <span className="text-slate-500">&rarr;</span>

              <div className="px-4 py-2 rounded-lg bg-blue-950 border border-blue-600 text-blue-200 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>EXPLANATION & ROI</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
