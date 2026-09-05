import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  IndianRupee, 
  Users, 
  Percent, 
  Tag, 
  FileCheck2,
  ExternalLink,
  Volume2,
  Zap
} from 'lucide-react';
import { GrowthOpportunity, ProposedCampaign } from '../types';

interface OpportunitiesListProps {
  opportunities: GrowthOpportunity[];
  onSelectCampaignForApproval: (campaign: ProposedCampaign) => void;
  onRunPipeline: () => void;
  isRunningPipeline: boolean;
}

export const OpportunitiesList: React.FC<OpportunitiesListProps> = ({
  opportunities,
  onSelectCampaignForApproval,
  onRunPipeline,
  isRunningPipeline,
}) => {
  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-bounce" />
        <h3 className="text-sm font-bold text-slate-900">No Active Opportunities</h3>
        <p className="text-xs text-slate-500 mt-1">Run the AI Multi-Agent pipeline to detect revenue leaks.</p>
        <button
          onClick={onRunPipeline}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
        >
          Analyze Store
        </button>
      </div>
    );
  }

  // First opportunity is featured as recommended
  const primaryOpp = opportunities[0];
  const secondaryOpps = opportunities.slice(1);

  const primaryCampaign = primaryOpp.proposedCampaign;
  const isPrimaryApproved = primaryCampaign.status === 'COMPLETED';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Card Header with pulsing orchestrator status */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Active Growth Analysis</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold hidden sm:inline-block">
            {opportunities.length} Actionable
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 italic hidden sm:inline">
            Orchestrator v2.4 (Policy-Bounded)
          </span>
          <button
            onClick={onRunPipeline}
            disabled={isRunningPipeline}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isRunningPipeline ? 'animate-spin' : ''}`} />
            <span>{isRunningPipeline ? 'Analyzing...' : 'Re-run AI'}</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5 flex-1">
        {/* Recommended Primary Opportunity Card */}
        <div className="bg-blue-50/80 border border-blue-200/80 p-5 rounded-xl flex flex-col md:flex-row md:items-start gap-4 transition-all hover:border-blue-300">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm shrink-0 self-start">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-blue-950 text-sm sm:text-base">
                  {primaryOpp.title}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  {primaryOpp.type.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-100/90 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                HIGH CONFIDENCE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed">
              {primaryOpp.summary}
            </p>

            {/* AI Agent Rationale box */}
            <div className="bg-white/90 rounded-lg p-2.5 border border-blue-200/60 text-xs text-slate-700">
              <span className="font-semibold text-blue-900 block text-[11px] mb-0.5">
                Multi-Agent Synthesis:
              </span>
              <p className="italic text-slate-600 text-[11px]">{primaryOpp.rationale}</p>
            </div>

            {/* Metrics Breakdown & Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-blue-200/60">
              <div className="text-center sm:text-left border-r border-blue-200/80 pr-4">
                <p className="text-[10px] uppercase text-blue-700 font-bold tracking-wider">Target Cohort</p>
                <p className="text-lg font-bold text-blue-950 font-mono">{primaryCampaign.targetAudienceCount} users</p>
              </div>

              <div className="text-center sm:text-left border-r border-blue-200/80 pr-4">
                <p className="text-[10px] uppercase text-blue-700 font-bold tracking-wider">Max Budget Cap</p>
                <p className="text-lg font-bold text-blue-950 font-mono">₹{primaryCampaign.budget.toLocaleString('en-IN')}</p>
              </div>

              <div className="text-center sm:text-left border-r border-blue-200/80 pr-4">
                <p className="text-[10px] uppercase text-blue-700 font-bold tracking-wider">Expected Lift</p>
                <p className="text-lg font-bold text-emerald-700 font-mono">₹{primaryCampaign.expectedRevenueLift.toLocaleString('en-IN')}</p>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-[10px] uppercase text-blue-700 font-bold tracking-wider">Risk Score</p>
                <p className="text-lg font-bold text-emerald-700 uppercase">{primaryCampaign.policyCheck.riskLevel}</p>
              </div>

              <div className="flex-1 flex justify-end">
                {isPrimaryApproved ? (
                  <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Active on Razorpay ({primaryCampaign.razorpayResponseData?.payment_link_id || 'plink_live'})</span>
                  </div>
                ) : (
                  <button
                    id={`review-campaign-btn-${primaryOpp.id}`}
                    onClick={() => onSelectCampaignForApproval(primaryCampaign)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg flex items-center gap-2 transition-all active:scale-95"
                  >
                    <span>Approve &amp; Execute</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Opportunities Grid */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Additional Detected Pipeline Opportunities
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryOpps.map((opp, idx) => {
              const campaign = opp.proposedCampaign;
              const isApproved = campaign.status === 'COMPLETED';

              return (
                <div
                  key={opp.id}
                  id={`opp-card-${idx + 2}`}
                  className="border border-slate-200 p-4 rounded-xl bg-slate-50/70 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        opp.type === 'CROSS_SELL'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {opp.type.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Risk: {campaign.policyCheck.riskLevel}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900">
                      {opp.title}
                    </h5>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {opp.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Audience</span>
                        <span className="font-bold text-slate-800 font-mono">{campaign.targetAudienceCount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Budget</span>
                        <span className="font-bold text-slate-800 font-mono">₹{campaign.budget.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Est. Lift</span>
                        <span className="font-bold text-emerald-600 font-mono">₹{campaign.expectedRevenueLift.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/70">
                    {isApproved ? (
                      <div className="text-xs font-semibold text-emerald-800 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Active on Razorpay</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-600">
                          {campaign.razorpayResponseData?.payment_link_id || 'plink_test'}
                        </span>
                      </div>
                    ) : (
                      <button
                        id={`review-campaign-btn-${opp.id}`}
                        onClick={() => onSelectCampaignForApproval(campaign)}
                        className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Review &amp; Approve</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

