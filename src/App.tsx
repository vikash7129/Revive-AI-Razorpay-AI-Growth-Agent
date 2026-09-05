/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricsCards } from './components/MetricsCards';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { OpportunitiesList } from './components/OpportunitiesList';
import { LiveAuditTrailPanel } from './components/LiveAuditTrailPanel';
import { ApprovalGateModal } from './components/ApprovalGateModal';
import { AuditTrailTable } from './components/AuditTrailTable';
import { DataExplorer } from './components/DataExplorer';
import { AiAdvisorDrawer } from './components/AiAdvisorDrawer';
import { PipelineProgressModal } from './components/PipelineProgressModal';
import { PitchVideoStudio } from './components/PitchVideoStudio';
import { 
  MerchantOverview, 
  Customer, 
  Transaction, 
  GrowthOpportunity, 
  AuditLog, 
  ProposedCampaign 
} from './types';
import { 
  INITIAL_MERCHANT_OVERVIEW, 
  SAMPLE_CUSTOMERS, 
  SAMPLE_TRANSACTIONS, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_AUDIT_LOGS 
} from './data/syntheticData';
import { AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Film } from 'lucide-react';

export default function App() {
  const [overview, setOverview] = useState<MerchantOverview>(INITIAL_MERCHANT_OVERVIEW);
  const [customers, setCustomers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [opportunities, setOpportunities] = useState<GrowthOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [isLoading, setIsLoading] = useState(true);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [activeArchitectureStep, setActiveArchitectureStep] = useState<string>('');

  const [selectedCampaignForApproval, setSelectedCampaignForApproval] = useState<ProposedCampaign | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [simulateFailureMode, setSimulateFailureMode] = useState(false);
  const [activeExplorerTab, setActiveExplorerTab] = useState<'customers' | 'transactions' | 'failures'>('customers');
  
  // Navigation & responsive drawer states
  const [activeNavTab, setActiveNavTab] = useState<SidebarTab>('pitch');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load state from backend
  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data.overview) setOverview(data.overview);
        if (data.customers) setCustomers(data.customers);
        if (data.transactions) setTransactions(data.transactions);
        if (data.opportunities) setOpportunities(data.opportunities);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
      }
    } catch (e) {
      console.warn('Using local synthetic data fallback', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Run full multi-agent pipeline
  const handleRunPipeline = async () => {
    setIsRunningPipeline(true);
    setPipelineStep(0);
    setActiveArchitectureStep('analyst');

    // Visually step through the agents for optimal demonstration
    await new Promise((r) => setTimeout(r, 700));
    setPipelineStep(1);
    setActiveArchitectureStep('customer');

    await new Promise((r) => setTimeout(r, 700));
    setPipelineStep(2);
    setActiveArchitectureStep('campaign');

    await new Promise((r) => setTimeout(r, 700));
    setPipelineStep(3);
    setActiveArchitectureStep('orchestrator');

    await new Promise((r) => setTimeout(r, 600));
    setPipelineStep(4);

    try {
      const res = await fetch('/api/agent/run-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.opportunities) setOpportunities(data.opportunities);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsRunningPipeline(false);
        setActiveArchitectureStep('');
      }, 500);
    }
  };

  const handleOpenApprovalModal = (campaign: ProposedCampaign) => {
    setSelectedCampaignForApproval(campaign);
    setIsApprovalModalOpen(true);
  };

  const handleExecutionComplete = (updatedCampaign: ProposedCampaign, newAuditLog: AuditLog) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.proposedCampaign.id === updatedCampaign.id) {
          return { ...opp, proposedCampaign: updatedCampaign };
        }
        return opp;
      })
    );

    setAuditLogs((prev) => [newAuditLog, ...prev]);

    // Update merchant metrics slightly
    setOverview((prev) => ({
      ...prev,
      atRiskCustomerCount: Math.max(0, prev.atRiskCustomerCount - (updatedCampaign.expectedRecoveryCount || 10)),
    }));
  };

  const handleResetData = async () => {
    try {
      await fetch('/api/data/reset', { method: 'POST' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectCampaignFromAdvisor = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId) || opportunities[0];
    if (opp) {
      handleOpenApprovalModal(opp.proposedCampaign);
    }
  };

  const getHeaderTitle = () => {
    switch (activeNavTab) {
      case 'pitch':
        return 'Pitch Video & Presentation Flow (5:00)';
      case 'agents':
        return 'AI Agents & Multi-Agent Orchestrator';
      case 'analytics':
        return 'Store Analytics & Customer Segments';
      case 'audit':
        return 'Verifiable AI Audit Trail';
      default:
        return 'Dashboard Overview';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-800 flex">
      {/* 🧭 Professional Polish Sidebar */}
      <Sidebar
        currentTab={activeNavTab}
        onSelectTab={setActiveNavTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <Header
          onRunPipeline={handleRunPipeline}
          isRunningPipeline={isRunningPipeline}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onResetData={handleResetData}
          simulateFailureMode={simulateFailureMode}
          setSimulateFailureMode={setSimulateFailureMode}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenPitchVideo={() => setActiveNavTab('pitch')}
          activeTabLabel={getHeaderTitle()}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Banner if failure demo mode is enabled */}
          {simulateFailureMode && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 text-amber-900 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Buildathon Failure Handling Demo Active:</strong> The next approved campaign will simulate an API 504 drop, trigger automatic retries, and activate the SAFE STOP protocol.
                </span>
              </div>
              <button
                onClick={() => setSimulateFailureMode(false)}
                className="font-bold underline text-amber-800 hover:text-amber-950 ml-2"
              >
                Turn Off
              </button>
            </div>
          )}

          {/* 🎬 Pitch Video Presentation Tab */}
          {activeNavTab === 'pitch' && (
            <PitchVideoStudio
              onNavigateToHub={() => setActiveNavTab('hub')}
              onOpenApprovalModal={() => {
                if (opportunities[0]) {
                  handleOpenApprovalModal(opportunities[0].proposedCampaign);
                }
              }}
              onRunPipeline={handleRunPipeline}
            />
          )}

          {/* Tab Views: Hub (Default), Agents, Analytics, or Audit */}
          {activeNavTab === 'hub' && (
            <>
              {/* Quick Launch Banner to Pitch Video */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-blue-800/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/20 rounded-lg border border-blue-400/30 text-blue-300">
                    <Film className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                      <span>5-Minute Pitch Video &amp; Male Presenter Demo Ready</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500 text-[10px] font-mono">0:00 - 5:00</span>
                    </h3>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Full pitch walkthrough with synchronized voice narration, live screen demos, guardrail checks, and failure recovery.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveNavTab('pitch')}
                  className="px-3.5 py-1.5 bg-white text-blue-900 hover:bg-blue-50 rounded-lg text-xs font-bold shrink-0 transition-colors shadow-sm self-start sm:self-auto flex items-center gap-1.5"
                >
                  <span>Launch Pitch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* 1️⃣ Merchant Dashboard Top Metrics */}
              <section aria-label="Merchant Overview Metrics">
                <MetricsCards
                  overview={overview}
                  onFilterCategory={(cat) => {
                    setActiveNavTab('analytics');
                    if (cat === 'failures') setActiveExplorerTab('failures');
                    else if (cat === 'at_risk' || cat === 'customers') setActiveExplorerTab('customers');
                    else if (cat === 'transactions') setActiveExplorerTab('transactions');
                  }}
                />
              </section>

              {/* 2️⃣ Main Growth Analysis + Live Audit Trail Split Row */}
              <section aria-label="Active Growth and Audit Trail" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <OpportunitiesList
                    opportunities={opportunities}
                    onSelectCampaignForApproval={handleOpenApprovalModal}
                    onRunPipeline={handleRunPipeline}
                    isRunningPipeline={isRunningPipeline}
                  />
                </div>

                <div className="lg:col-span-1">
                  <LiveAuditTrailPanel
                    logs={auditLogs}
                    onViewFullTrail={() => setActiveNavTab('audit')}
                  />
                </div>
              </section>

              {/* 3️⃣ Multi-Agent Architecture Collapsible Visualizer */}
              <section aria-label="Agent System Architecture">
                <ArchitectureDiagram activeStep={activeArchitectureStep} />
              </section>

              {/* 4️⃣ Store Data Explorer */}
              <section aria-label="Store Data Explorer">
                <DataExplorer
                  customers={customers}
                  transactions={transactions}
                  activeTab={activeExplorerTab}
                />
              </section>
            </>
          )}

          {activeNavTab === 'agents' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Multi-Agent Growth Architecture</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Specialized agents run independently and feed proposals into a deterministic policy gate before executing on Razorpay Test APIs.
                  </p>
                </div>
                <button
                  onClick={handleRunPipeline}
                  disabled={isRunningPipeline}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isRunningPipeline ? 'animate-spin' : ''}`} />
                  <span>{isRunningPipeline ? 'Agents Executing...' : 'Execute Multi-Agent Cycle'}</span>
                </button>
              </div>

              <ArchitectureDiagram activeStep={activeArchitectureStep} />

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Deterministic Policy &amp; Guardrail Caps
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Budget Upper Bound</p>
                    <p className="text-slate-600">Maximum ₹10,000 per autonomous campaign. Requests exceeding this are hard-stopped.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Discount Threshold</p>
                    <p className="text-slate-600">Strictly capped at 15% to protect merchant margins from unintended AI hallucination.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Mandatory Human Gate</p>
                    <p className="text-slate-600">No payment links or offers go live without explicit merchant approval on the interface.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNavTab === 'analytics' && (
            <div className="space-y-6">
              <DataExplorer
                customers={customers}
                transactions={transactions}
                activeTab={activeExplorerTab}
              />
            </div>
          )}

          {activeNavTab === 'audit' && (
            <div className="space-y-6">
              <AuditTrailTable logs={auditLogs} />
            </div>
          )}

        </main>

        {/* Professional Polish Footer */}
        <footer className="h-12 bg-white border-t border-slate-200 px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-4">
            <span>Mode: <b>Razorpay Test Environment</b></span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI Decision Engine Active
            </span>
          </div>
          <div>
            ReviveAI &copy; 2026 &bull; <span className="text-slate-400">Security Tier: Professional Polish</span>
          </div>
        </footer>
      </div>

      {/* 🔐 Approval Gate Modal */}
      <ApprovalGateModal
        campaign={selectedCampaignForApproval}
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onExecutionComplete={handleExecutionComplete}
        globalSimulateFailureMode={simulateFailureMode}
      />

      {/* AI Advisor Drawer ("Ask ReviveAI") */}
      <AiAdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        opportunities={opportunities}
        onSelectCampaign={handleSelectCampaignFromAdvisor}
      />

      {/* Multi-Agent Live Pipeline Progress Modal */}
      <PipelineProgressModal
        isOpen={isRunningPipeline}
        activeStep={pipelineStep}
      />
    </div>
  );
}
