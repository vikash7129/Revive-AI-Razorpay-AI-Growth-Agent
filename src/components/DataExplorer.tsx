import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  AlertCircle, 
  ShoppingBag, 
  Clock, 
  IndianRupee, 
  CheckCircle2,
  XCircle,
  Sparkles,
  Search
} from 'lucide-react';
import { Customer, Transaction } from '../types';

interface DataExplorerProps {
  customers: Customer[];
  transactions: Transaction[];
  activeTab?: 'customers' | 'transactions' | 'failures';
}

export const DataExplorer: React.FC<DataExplorerProps> = ({
  customers,
  transactions,
  activeTab: initialTab = 'customers',
}) => {
  const [tab, setTab] = useState<'customers' | 'transactions' | 'failures'>(initialTab);
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.segment.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.razorpayOrderId.toLowerCase().includes(search.toLowerCase()) ||
      t.method.toLowerCase().includes(search.toLowerCase());

    if (tab === 'failures') {
      return matchesSearch && t.status === 'failed';
    }
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Tab Navigation */}
      <div className="px-4 sm:px-6 pt-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('customers')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              tab === 'customers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers &amp; Churn Signals</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 font-mono">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setTab('transactions')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              tab === 'transactions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Test Transactions</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 font-mono">
              {transactions.length}
            </span>
          </button>

          <button
            onClick={() => setTab('failures')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              tab === 'failures'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <span>Failed Checkouts</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-mono font-bold">
              {transactions.filter((t) => t.status === 'failed').length}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative pb-3 sm:pb-2">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 sm:top-2.5" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-full sm:w-48"
          />
        </div>
      </div>

      {/* Tab 1: Customers */}
      {tab === 'customers' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Customer Name</th>
                <th className="py-2.5 px-4">Recency (Last Purchase)</th>
                <th className="py-2.5 px-4">AOV</th>
                <th className="py-2.5 px-4">Total Spent</th>
                <th className="py-2.5 px-4">AI Segment</th>
                <th className="py-2.5 px-4">Last Product</th>
                <th className="py-2.5 px-4 text-right">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => {
                const isCustomerB = cust.name.includes('Customer B') || cust.lastPurchaseDaysAgo > 90;
                const isCustomerA = cust.name.includes('Customer A');

                return (
                  <tr 
                    key={cust.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isCustomerB ? 'bg-amber-50/30' : isCustomerA ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div>{cust.name}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{cust.email}</span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`font-mono font-semibold ${
                        cust.lastPurchaseDaysAgo >= 60 ? 'text-amber-700 font-bold' : 'text-slate-700'
                      }`}>
                        {cust.lastPurchaseDaysAgo} days ago
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-800">
                      ₹{cust.averageOrderValue.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        cust.segment === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cust.segment === 'at_risk'
                          ? 'bg-amber-100 text-amber-800'
                          : cust.segment === 'churned'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {cust.segment.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 max-w-[180px] truncate text-[11px]">
                      {cust.lastProductBought}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isCustomerB ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          Target Win-Back
                        </span>
                      ) : cust.lastProductBought.includes('Running') ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          Cross-Sell Accessories
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard Nurture</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2 & 3: Transactions / Failures */}
      {(tab === 'transactions' || tab === 'failures') && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Razorpay Order ID</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Method</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Details / Failure Reason</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    <div>{tx.razorpayOrderId}</div>
                    {tx.razorpayPaymentId && (
                      <span className="text-[10px] text-slate-400">{tx.razorpayPaymentId}</span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-900">
                    {tx.customerName}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-4 uppercase text-[10px] font-mono font-semibold text-slate-600">
                    {tx.method}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    {tx.status === 'captured' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Captured
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-slate-600 text-[11px] max-w-xs">
                    {tx.failureReason ? (
                      <span className="text-rose-700 font-medium">{tx.failureReason}</span>
                    ) : (
                      <span>{tx.items.map((i) => i.productName).join(', ')}</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {tx.status === 'failed' ? (
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded border border-blue-200 cursor-pointer">
                        Create Retry Link
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[10px]">Test Captured</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
