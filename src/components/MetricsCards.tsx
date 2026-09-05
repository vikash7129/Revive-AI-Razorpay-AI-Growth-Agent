import React from 'react';
import { 
  IndianRupee, 
  Users, 
  CreditCard, 
  AlertCircle, 
  UserX, 
  ArrowUpRight, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { MerchantOverview } from '../types';

interface MetricsCardsProps {
  overview: MerchantOverview;
  onFilterCategory?: (category: string) => void;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ overview, onFilterCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* 1. Revenue */}
      <div 
        id="metric-card-revenue"
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
      >
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue (30d)</p>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
            ₹{overview.totalRevenue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-2 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.2% from last month</span>
        </div>
      </div>

      {/* 2. Active Customers */}
      <div 
        id="metric-card-customers"
        onClick={() => onFilterCategory?.('customers')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 cursor-pointer transition-colors group"
      >
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Customers</p>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
            {overview.customerCount.toLocaleString('en-IN')}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          AOV: <span className="font-semibold text-slate-800 font-mono">₹{overview.averageOrderValue.toLocaleString('en-IN')}</span>
        </p>
      </div>

      {/* 3. Transactions & Success Rate */}
      <div 
        id="metric-card-transactions"
        onClick={() => onFilterCategory?.('transactions')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 cursor-pointer transition-colors group"
      >
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Transactions</p>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
            {overview.transactionCount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-2 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{overview.paymentSuccessRate}% success rate</span>
        </div>
      </div>

      {/* 4. Failed Payments (Problem identified) */}
      <div 
        id="metric-card-failed-payments"
        onClick={() => onFilterCategory?.('failures')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-red-400 cursor-pointer transition-colors group"
      >
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">Failed Payments</p>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1.5 font-mono">
            {overview.failedPaymentCount}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-red-500 mt-2 font-medium">
          <span>₹1.42L GMV at risk</span>
          <span className="underline group-hover:text-red-700">Recover &rarr;</span>
        </div>
      </div>

      {/* 5. At-Risk Customers (border-l-4 border-l-orange-400 as per design) */}
      <div 
        id="metric-card-at-risk"
        onClick={() => onFilterCategory?.('at_risk')}
        className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-orange-400 shadow-sm flex flex-col justify-between hover:border-orange-400 cursor-pointer transition-colors group col-span-2 md:col-span-1"
      >
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">At-Risk Customers</p>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <UserX className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-orange-600 mt-1.5 font-mono">
            {overview.atRiskCustomerCount}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-orange-500 mt-2 font-medium">
          <span>&gt;60 days inactive</span>
          <span className="underline group-hover:text-orange-700">Win-Back &rarr;</span>
        </div>
      </div>
    </div>
  );
};
