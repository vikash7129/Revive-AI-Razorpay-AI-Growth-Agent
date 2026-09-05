import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Eye, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AuditLog } from '../types';

interface AuditTrailTableProps {
  logs: AuditLog[];
}

export const AuditTrailTable: React.FC<AuditTrailTableProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('ALL');
  const [inspectLog, setInspectLog] = useState<AuditLog | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.razorpayRefId && log.razorpayRefId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAgent = selectedAgent === 'ALL' || log.agent === selectedAgent;

    return matchesSearch && matchesAgent;
  });

  const exportAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `revive_ai_audit_trail_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Verifiable AI Audit Trail</span>
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {logs.length} Immutable Logs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full compliance ledger: What AI did + Why + Within what deterministic budget limits + Approvals
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-48 sm:w-60"
            />
          </div>

          {/* Export button */}
          <button
            onClick={exportAsJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
            title="Download JSON Audit Trail"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
          Agent:
        </span>
        {['ALL', 'Data Analyst Agent', 'Customer Agent', 'Campaign Agent', 'Decision Engine (Policy & Risk)', 'Razorpay Test API'].map((agent) => (
          <button
            key={agent}
            onClick={() => setSelectedAgent(agent)}
            className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
              selectedAgent === agent
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {agent === 'ALL' ? 'All Agents' : agent.replace(' Agent', '')}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Agent Role</th>
              <th className="py-3 px-4">Action &amp; Target</th>
              <th className="py-3 px-4">AI Reason / Justification</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4">Policy Check</th>
              <th className="py-3 px-4">Merchant Signoff</th>
              <th className="py-3 px-4">Execution</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                  No audit records match your search filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setInspectLog(log)}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                >
                  {/* Timestamp */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-500 text-[11px]">
                    {log.timestamp}
                  </td>

                  {/* Agent */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                      log.agent.includes('Analyst')
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : log.agent.includes('Customer')
                        ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                        : log.agent.includes('Campaign')
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : log.agent.includes('Decision')
                        ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}>
                      {log.agent}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    <div>{log.action}</div>
                    {log.razorpayRefId && (
                      <span className="font-mono text-[10px] text-blue-600 block">
                        ID: {log.razorpayRefId}
                      </span>
                    )}
                  </td>

                  {/* Reason */}
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate text-[11px]">
                    {log.reason}
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-800 font-semibold">
                    {log.budget > 0 ? `₹${log.budget.toLocaleString('en-IN')}` : '—'}
                  </td>

                  {/* Policy */}
                  <td className="py-3 px-4 whitespace-nowrap font-semibold">
                    <span className={`inline-flex items-center gap-1 ${
                      log.policyStatus.includes('Passed') ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {log.policyStatus}
                    </span>
                  </td>

                  {/* Merchant Approval */}
                  <td className="py-3 px-4 whitespace-nowrap font-semibold">
                    <span className={`inline-flex items-center gap-1 ${
                      log.merchantApproval.includes('Approved') 
                        ? 'text-emerald-700' 
                        : log.merchantApproval.includes('Pending')
                        ? 'text-amber-700'
                        : 'text-slate-500'
                    }`}>
                      {log.merchantApproval}
                    </span>
                  </td>

                  {/* Execution */}
                  <td className="py-3 px-4 whitespace-nowrap font-semibold">
                    <span className={`inline-flex items-center gap-1 ${
                      log.executionStatus.includes('Successful')
                        ? 'text-emerald-700'
                        : log.executionStatus.includes('Stopped')
                        ? 'text-amber-700'
                        : 'text-slate-600'
                    }`}>
                      {log.executionStatus}
                    </span>
                  </td>

                  {/* Inspect Action */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectLog(log);
                      }}
                      className="p-1 rounded text-slate-400 group-hover:text-blue-600 hover:bg-slate-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect Log Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Audit Log Details &amp; Verification
                </h3>
              </div>
              <button
                onClick={() => setInspectLog(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Timestamp</span>
                  <span className="font-mono text-slate-800 font-semibold">{inspectLog.timestamp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Agent</span>
                  <span className="font-semibold text-blue-700">{inspectLog.agent}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Action</span>
                  <span className="font-semibold text-slate-800">{inspectLog.action}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Budget</span>
                  <span className="font-mono text-slate-800 font-semibold">
                    {inspectLog.budget > 0 ? `₹${inspectLog.budget.toLocaleString('en-IN')}` : 'None'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Reason / AI Justification</span>
                <p className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-700 italic">
                  "{inspectLog.reason}"
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Detailed Explanation</span>
                <p className="text-slate-700 leading-relaxed">
                  {inspectLog.details}
                </p>
              </div>

              {inspectLog.policyCheckSummary && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Deterministic Policy Validation</span>
                  <div className="p-2.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-[11px]">
                    {inspectLog.policyCheckSummary}
                  </div>
                </div>
              )}

              {inspectLog.payloadSnapshot && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Razorpay Test Mode Payload</span>
                  <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg text-[10px] font-mono overflow-x-auto">
                    {JSON.stringify(inspectLog.payloadSnapshot, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
