import React from 'react';
import { Zap, ArrowUpRight, ShieldCheck, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { AuditLog } from '../types';

interface LiveAuditTrailPanelProps {
  logs: AuditLog[];
  onViewFullTrail?: () => void;
}

export const LiveAuditTrailPanel: React.FC<LiveAuditTrailPanelProps> = ({
  logs,
  onViewFullTrail,
}) => {
  const recentLogs = logs.slice(0, 5);

  return (
    <div className="bg-[#0F172A] text-white rounded-xl shadow-lg border border-slate-800 flex flex-col h-full justify-between overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-sm tracking-tight text-white uppercase">
            LIVE AUDIT TRAIL
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          REALTIME
        </span>
      </div>

      {/* Log Feed */}
      <div className="p-4 font-mono text-[11px] space-y-4 flex-1 overflow-y-auto max-h-[380px]">
        {recentLogs.map((log, index) => {
          const isFailed = log.executionStatus.toLowerCase().includes('stopped') || 
                          log.action.toLowerCase().includes('fail') ||
                          log.executionStatus.toLowerCase().includes('error');
          const isPassed = log.policyStatus.toLowerCase().includes('passed');

          return (
            <div
              key={log.id || index}
              className={`border-l-2 pl-3 py-1 transition-all ${
                isFailed
                  ? 'border-red-500 bg-red-950/20 rounded-r-md'
                  : index === 0
                  ? 'border-emerald-500 bg-emerald-950/10 rounded-r-md'
                  : 'border-slate-600 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>{log.timestamp}</span>
                {log.budget > 0 && (
                  <span className="text-slate-300 font-semibold">₹{log.budget.toLocaleString('en-IN')}</span>
                )}
              </div>

              <div className="text-blue-300 font-semibold mt-0.5">
                [{log.agent.replace(' Agent', '')}]
              </div>

              <div className="text-slate-200 mt-0.5 font-sans text-xs line-clamp-2">
                {log.action}
              </div>

              <div className="mt-1 flex items-center gap-2 text-[10px]">
                <span className={isPassed ? 'text-emerald-400' : 'text-amber-400'}>
                  Policy: {log.policyStatus}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className={
                  log.executionStatus.includes('Successful') 
                    ? 'text-emerald-400' 
                    : isFailed 
                    ? 'text-red-400' 
                    : 'text-slate-400'
                }>
                  Status: {log.executionStatus}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Link to full audit ledger */}
      <div className="border-t border-slate-800 bg-slate-900/90 p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-blue-300 text-[10px] italic">
            Bounded by Merchant Policy Caps v1.2
          </span>
          {onViewFullTrail && (
            <button
              onClick={onViewFullTrail}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>Full Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
