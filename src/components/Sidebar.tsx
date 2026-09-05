import React from 'react';
import { 
  Store, 
  Zap, 
  Cpu, 
  BarChart3, 
  FileText, 
  X,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  currentTab: 'hub' | 'agents' | 'analytics' | 'audit';
  onSelectTab: (tab: 'hub' | 'agents' | 'analytics' | 'audit') => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems: { id: 'hub' | 'agents' | 'analytics' | 'audit'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'hub', label: 'Merchant Hub', icon: Store },
    { id: 'agents', label: 'AI Agents', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audit', label: 'Audit Trail', icon: FileText },
  ];

  const content = (
    <div className="w-64 bg-[#0F172A] text-white flex flex-col h-full border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-sm shadow-blue-500/30">
            R
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white block leading-tight">
              ReviveAI
            </span>
            <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider block">
              Growth Engine
            </span>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
          Platform Views
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>
          );
        })}

        <div className="pt-6">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
            Safety &amp; Compliance
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-[11px] text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Policy Guardrails v1.2</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Merchant Budget Cap: &le;₹10,000<br />
              Discount Cap: &le;15%<br />
              Human-in-the-Loop: Enforced
            </p>
          </div>
        </div>
      </nav>

      {/* Merchant Account info in bottom footer */}
      <div className="p-5 border-t border-slate-800 bg-[#0c1322]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-200 border border-slate-600">
            UG
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-white">UrbanGrip Athletics</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Test Mode Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 overflow-y-auto">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={onCloseMobile} 
          />
          <div className="relative z-10 h-full">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
