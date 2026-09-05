export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type PolicyCheckStatus = 'PASSED' | 'FAILED' | 'FLAGGED';

export type CampaignStatus = 
  | 'PROPOSED'
  | 'WAITING_FOR_APPROVAL'
  | 'APPROVED'
  | 'EXECUTING'
  | 'RETRYING'
  | 'COMPLETED'
  | 'FAILED_SAFELY'
  | 'REJECTED';

export type AgentRole = 
  | 'Orchestrator'
  | 'Data Analyst Agent'
  | 'Customer Agent'
  | 'Campaign Agent'
  | 'Decision Engine (Policy & Risk)'
  | 'Razorpay Test API';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastPurchaseDaysAgo: number;
  totalOrders: number;
  averageOrderValue: number;
  totalSpent: number;
  segment: 'active' | 'at_risk' | 'churned' | 'first_time';
  favoriteCategory: string;
  lastProductBought: string;
  hasRecentFailedPayment?: boolean;
}

export interface Transaction {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'captured' | 'failed' | 'authorized' | 'created';
  method: 'upi' | 'card' | 'netbanking' | 'wallet';
  failureReason?: string;
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export interface GrowthOpportunity {
  id: string;
  title: string;
  type: 'WIN_BACK' | 'CROSS_SELL' | 'PAYMENT_RECOVERY' | 'AOV_BOOST';
  urgency: 'high' | 'medium' | 'low';
  summary: string;
  rationale: string;
  affectedCount: number;
  sampleAudience: string[];
  potentialRevenue: number;
  proposedCampaign: ProposedCampaign;
}

export interface PolicyRuleResult {
  ruleId: string;
  ruleName: string;
  limit: string;
  proposedValue: string;
  passed: boolean;
  notes: string;
}

export interface PolicyCheck {
  overallStatus: PolicyCheckStatus;
  riskLevel: RiskLevel;
  maxBudgetAllowed: number;
  proposedBudget: number;
  maxDiscountAllowedPercent: number;
  proposedDiscountPercent: number;
  maxAudienceCap: number;
  proposedAudienceCount: number;
  rules: PolicyRuleResult[];
  explanation: string;
}

export interface ProposedCampaign {
  id: string;
  name: string;
  type: 'WIN_BACK' | 'CROSS_SELL' | 'PAYMENT_RECOVERY';
  targetAudienceDescription: string;
  targetAudienceCount: number;
  budget: number;
  discountPercent: number;
  discountCapPerUser: number;
  durationDays: number;
  callToAction: string;
  expectedRecoveryCount: number;
  expectedRevenueLift: number;
  razorpayActionType: 'CREATE_PAYMENT_LINKS' | 'CREATE_OFFER_ORDERS' | 'GENERATE_RETRY_TOKENS';
  status: CampaignStatus;
  policyCheck: PolicyCheck;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  executionLogs?: string[];
  retryCount?: number;
  razorpayResponseData?: any;
  failureDetails?: {
    stepFailed: string;
    apiEndpoint: string;
    httpStatus: number;
    errorCode: string;
    errorMessage: string;
    retriesAttempted: number;
    safeStopAction: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  agent: AgentRole;
  action: string;
  reason: string;
  budget: number;
  policyStatus: 'Passed ✅' | 'Failed ❌' | 'Bypassed ⚠️';
  merchantApproval: 'Approved ✅' | 'Rejected ❌' | 'Pending ⏳' | 'Not Required ℹ️';
  executionStatus: 'Successful ✅' | 'Stopped Safely ⚠️' | 'Executing 🔄' | 'Pending Review ⏱️';
  details: string;
  razorpayRefId?: string;
  policyCheckSummary?: string;
  payloadSnapshot?: any;
}

export interface MerchantOverview {
  storeName: string;
  mode: 'test';
  currency: string;
  totalRevenue: number;
  customerCount: number;
  transactionCount: number;
  failedPaymentCount: number;
  atRiskCustomerCount: number;
  averageOrderValue: number;
  paymentSuccessRate: number;
  lastUpdated: string;
}

export interface AgentRunState {
  isRunning: boolean;
  currentStep: 'idle' | 'analyzing_data' | 'segmenting_customers' | 'crafting_campaigns' | 'evaluating_policies' | 'awaiting_approval';
  stepProgress: number; // 0 - 100
  logMessages: { timestamp: string; agent: AgentRole; message: string }[];
}
