import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Bot, 
  Zap, 
  AlertTriangle,
  Menu,
  Film
} from 'lucide-react';

interface HeaderProps {
  onRunPipeline: () => void;
  isRunningPipeline: boolean;
  onOpenAdvisor: () => void;
  onResetData: () => void;
  simulateFailureMode: boolean;
  setSimulateFailureMode: (val: boolean) => void;
  onOpenMobileMenu?: () => void;
  onOpenPitchVideo?: () => void;
  activeTabLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onRunPipeline,
  isRunningPipeline,
  onOpenAdvisor,
  onResetData,
  simulateFailureMode,
  setSimulateFailureMode,
  onOpenMobileMenu,
  onOpenPitchVideo,
  activeTabLabel = 'Dashboard Overview',
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left side: Mobile menu toggle + Context title & status badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
            {activeTabLabel}
          </h2>
          <span className="hidden sm:inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded uppercase tracking-wider items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Connected: Razorpay API
          </span>
        </div>
      </div>

      {/* Right side: Controls and action buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Failure demo toggle for buildathon */}
        <button
          id="toggle-failure-demo"
          onClick={() => setSimulateFailureMode(!simulateFailureMode)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
            simulateFailureMode
              ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
          title="Demonstrates graceful failure recovery required by Razorpay brief"
        >
          <AlertTriangle className={`w-3.5 h-3.5 ${simulateFailureMode ? 'text-amber-600' : 'text-slate-400'}`} />
          <span className="hidden md:inline">Failure Demo:</span>
          <span className={`font-semibold ${simulateFailureMode ? 'text-amber-700' : 'text-slate-500'}`}>
            {simulateFailureMode ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Pitch Video Button */}
        {onOpenPitchVideo && (
          <button
            id="open-pitch-video-btn"
            onClick={onOpenPitchVideo}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm transition-all active:scale-95"
            title="Watch 5-Minute Pitch Video Demo Flow (0:00 - 5:00)"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pitch Video</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">5m</span>
          </button>
        )}

        {/* AI Advisor button */}
        <button
          id="open-ai-advisor"
          onClick={onOpenAdvisor}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Ask</span>
          <span>ReviveAI</span>
        </button>

        {/* Reset button */}
        <button
          id="reset-demo-data"
          onClick={onResetData}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Primary Action Button */}
        <button
          id="run-growth-pipeline-btn"
          onClick={onRunPipeline}
          disabled={isRunningPipeline}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-white transition-all shadow-sm ${
            isRunningPipeline
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-500/20'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isRunningPipeline ? 'animate-spin' : ''}`} />
          <span>{isRunningPipeline ? 'Analyzing...' : 'Find Growth Opportunities'}</span>
        </button>
      </div>
    </header>
  );
};
