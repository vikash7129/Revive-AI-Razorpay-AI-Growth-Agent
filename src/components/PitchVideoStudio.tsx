import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Users, 
  IndianRupee, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  Copy, 
  Check, 
  Mic, 
  Radio, 
  Film,
  Languages,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

export interface PitchScene {
  id: string;
  startSec: number;
  endSec: number;
  timestampLabel: string;
  title: string;
  subtitle: string;
  quotePrompt: string;
  screenVisual: 'problem' | 'dashboard' | 'agents' | 'recommendation' | 'safety' | 'razorpay' | 'failure' | 'final';
  scriptEn: string;
  scriptHi: string;
  keyTakeaway: string;
  badge: string;
}

export const PITCH_SCENES: PitchScene[] = [
  {
    id: 'problem',
    startSec: 0,
    endSec: 30,
    timestampLabel: '0:00–0:30',
    title: 'The Core Merchant Problem',
    subtitle: 'Data abundance, operational paralysis',
    quotePrompt: '"Small merchants have transaction data, but identifying and acting on revenue opportunities manually is difficult."',
    screenVisual: 'problem',
    badge: 'Problem Statement',
    keyTakeaway: 'D2C merchants possess gigabytes of Razorpay data but lack data teams to calculate churn intervals or basket affinities.',
    scriptEn: "Hi everyone, I'm Vikash Sahu, co-founder and tech lead of ReviveAI. Every single day, thousands of Indian D2C and small merchants process lakhs of rupees through Razorpay. They have transaction data, order histories, and payment logs sitting right inside their dashboard. But here is the bitter truth: small merchants have transaction data, but identifying and acting on revenue opportunities manually is difficult. A small business owner doesn't have the time to build customer cohorts, calculate churn intervals, find cross-sell baskets, or debug 3D Secure failure drops. The result? Lakhs of rupees in repeat orders and customer lifetime value leak away unnoticed every month.",
    scriptHi: "Namaste dosto! Main Vikash Sahu hoon, ReviveAI ka co-founder aur tech lead. Roz hazaron Indian D2C aur small merchants Razorpay ke zariye lakhs of transactions process karte hain. Unke paas raw transaction data aur payment logs maujood hain. Lekin haqeeqat ye hai: small merchants ke paas transaction data to hota hai, par manually revenue opportunities pehchanna aur unpar action lena behad mushkil hota hai. Merchant ke paas data science team nahi hoti ki wo churn intervals aur basket affinities calculate karein. Natija ye hota hai ki har mahine lakhs of rupees ka repeat revenue chupchaap leak ho jata hai.",
  },
  {
    id: 'dashboard',
    startSec: 30,
    endSec: 75,
    timestampLabel: '0:30–1:15',
    title: 'Merchant Dashboard & Revenue Leaks',
    subtitle: 'Realtime telemetry across revenue, customers, and failures',
    quotePrompt: 'Dashboard: Revenue, customers, failed payments etc.',
    screenVisual: 'dashboard',
    badge: 'Store Telemetry',
    keyTakeaway: 'UrbanGrip Athletics: ₹42.8L GMV, 1,248 customers, 87 failed 3D-Secure checkouts, 126 at-risk churn accounts.',
    scriptEn: "Let's look at the ReviveAI Merchant Hub for our store, UrbanGrip Athletics. Right here on the dashboard, we see the real-time financial heartbeat: ₹42.8 Lakhs in 30-day gross revenue across 2,341 transactions, with an Average Order Value of ₹1,828 and 1,248 total customers. But pay close attention to these two alert metrics: 87 failed payment checkouts representing over ₹1.42 Lakhs in stalled GMV, and 126 at-risk customers who have lapsed beyond their 42-day cycle without buying again. In a standard payment gateway dashboard, this data just sits idle. With ReviveAI, it becomes an autonomous growth engine.",
    scriptHi: "Ab dekhte hain hamare store UrbanGrip Athletics ka ReviveAI Merchant Hub. Dashboard par real-time financial metrics saaf dikh rahe hain: 30 dino mein ₹42.8 Lakhs gross revenue, 2,341 transactions, ₹1,828 ka Average Order Value, aur 1,248 active customers. Lekin do critical alert metrics dekhiye: 87 failed payment checkouts jisme ₹1.42 Lakhs ka GMV atka hua hai, aur 126 at-risk customers jo 42 dino ke cycle se bahar ja chuke hain. Ek normal dashboard mein ye data bas pada rehta hai. ReviveAI isko direct revenue recovery mein badalta hai.",
  },
  {
    id: 'agents',
    startSec: 75,
    endSec: 135,
    timestampLabel: '1:15–2:15',
    title: 'AI Multi-Agent Pipeline Execution',
    subtitle: 'Data Analyst + Customer Agent + Campaign Agent in unison',
    quotePrompt: 'AI agent: "Find growth opportunities." Agent identifies inactive customers + cross-sell opportunity.',
    screenVisual: 'agents',
    badge: 'Multi-Agent Swarm',
    keyTakeaway: 'The merchant clicks one button; Data Analyst and Customer Agents discover lapsed buyers and a 3.2% co-purchase accessory gap.',
    scriptEn: "Watch what happens when the merchant clicks one single button: 'Find Growth Opportunities'. ReviveAI does not rely on a single generic prompt; it dispatches a specialized multi-agent swarm. First, the Data Analyst Agent scans customer recency-frequency-monetary matrices, identifying that 126 customers have churned past 60 days. Next, the Customer Agent runs basket affinity analysis, discovering that 43 customers who bought our flagship running shoes have a 3.2% co-purchase affinity for performance socks, but never bought them. Simultaneously, it clusters the 87 payment drop-offs caused by 3D Secure issuer timeouts. In seconds, raw logs transform into concrete revenue hypotheses.",
    scriptHi: "Dekhiye jab merchant sirf ek button click karta hai: 'Find Growth Opportunities'. ReviveAI kisi single generic prompt par depend nahi karta; ye ek specialized multi-agent swarm trigger karta hai. Pehle Data Analyst Agent transactions scan karke 126 churned customers ko identify karta hai. Fir Customer Agent basket affinity analysis run karta hai aur paata hai ki 43 running shoes khareedne wale customers ne accessories bundle nahi liya. Sath hi 87 payment drop-offs ko cluster kiya jata hai. Sirf kuch seconds mein raw logs actionable growth hypotheses ban jaate hain.",
  },
  {
    id: 'recommendation',
    startSec: 135,
    endSec: 180,
    timestampLabel: '2:15–3:00',
    title: 'AI Recommendation: Win-Back Campaign',
    subtitle: 'Synthesizing targeted, high-confidence recovery initiatives',
    quotePrompt: 'AI recommendation: "I recommend a win-back campaign for 100 customers."',
    screenVisual: 'recommendation',
    badge: 'Targeted Proposal',
    keyTakeaway: 'Campaign Agent drafts a win-back campaign targeting high-LTV customers like Rohan Varma (93 days lapsed), projecting ₹58,000 lift.',
    scriptEn: "The Campaign Agent now synthesizes these hypotheses into actionable, bounded initiatives. Right at the top of our feed, the AI recommends: 'I recommend an Autumn Win-Back reactivation campaign for 100 inactive customers.' Instead of generic advice, it targets verified high-LTV customers like Customer B—Rohan Varma—who used to purchase every 28 days but hasn't ordered in 93 days. The agent forecasts an expected revenue lift of ₹58,000. Concurrently, it formulates a cross-sell bundle for 43 shoe buyers, and a zero-discount 1-click retry link for the 87 failed checkout drop-offs.",
    scriptHi: "Ab Campaign Agent in hypotheses ko bounded initiatives mein synthesize karta hai. Sabse upar AI recommend karta hai: 'I recommend a win-back campaign for 100 inactive customers.' Koi fake suggestion nahi, balki Rohan Varma jaise verified high-LTV customers jinhone 93 dino se order nahi kiya, unhe target kiya jata hai. Expected revenue lift hai ₹58,000. Iske sath shoe buyers ke liye cross-sell aur failed checkouts ke liye 1-click payment recovery recommend hoti hai.",
  },
  {
    id: 'safety',
    startSec: 180,
    endSec: 210,
    timestampLabel: '3:00–3:30',
    title: 'Safety Guardrails & Policy Gates',
    subtitle: 'Budget limits, discount caps, and human-in-the-loop signoff',
    quotePrompt: 'Safety: Budget limit → policy check → merchant approval.',
    screenVisual: 'safety',
    badge: 'Policy & Guardrails',
    keyTakeaway: 'Deterministic Decision Engine enforces Budget ≤ ₹10,000, Discount ≤ 15%, and requires 100% merchant human approval.',
    scriptEn: "Now comes the most critical part of ReviveAI: Safety and Deterministic Policy Guardrails. Small merchants cannot afford rogue AI agents hallucinating 90% off discounts or draining marketing budgets. Before any campaign can touch the real world, it must pass through our Decision Engine. The policy check verifies three hard boundaries: Budget limit strictly capped at ₹10,000, discount strictly capped at 15%, and target cohort limited to 200 users. It passes with a Risk Score of LOW (14/100). And strictly enforced: no action runs autonomously without the merchant's explicit human-in-the-loop review and approval.",
    scriptHi: "Ab aati hai ReviveAI ki sabse zaroori khoobi: Safety and Deterministic Policy Guardrails. Merchants rogue AI par bharosa nahi kar sakte jo 90% discount de de ya budget udao kar de. Har campaign ko hamare Decision Engine se guzarna padta hai: Budget limit strictly capped at ₹10,000, discount capped at 15%, aur audience capped at 200. Risk score LOW (14/100) certify hota hai. Aur sabse zaroori: merchant ke human-in-the-loop approval ke bina koi action run nahi ho sakta.",
  },
  {
    id: 'razorpay',
    startSec: 210,
    endSec: 255,
    timestampLabel: '3:30–4:15',
    title: 'Razorpay Test-Mode Execution',
    subtitle: 'Automated payment link generation and order reconciliation',
    quotePrompt: 'Razorpay test-mode execution.',
    screenVisual: 'razorpay',
    badge: 'Live Test API',
    keyTakeaway: 'Merchant approves; ReviveAI calls Razorpay Test APIs to generate verified payment links with webhooks in under 3 seconds.',
    scriptEn: "The merchant reviews the terms, sees the verified policy check, and clicks 'Approve & Execute via Razorpay'. Immediately, ReviveAI talks directly to Razorpay's Test APIs. It generates personalized, timed payment links—such as plink_live_test_78942—with automated expiry and webhooks. It binds the promo code to the customer's phone number and prepares the checkout session. Look at the status: Executed via Razorpay Test API. In under three minutes, a neglected churn problem has been converted into live, revenue-generating payment links without the merchant writing a single line of copy or configuring complex marketing automation.",
    scriptHi: "Merchant details review karta hai aur 'Approve & Execute via Razorpay' par click karta hai. ReviveAI turant Razorpay Test APIs ko call karta hai. Automated expiry aur webhooks ke sath personalized payment links—jaise plink_live_test_78942—generate hoti hain. Promo code customer phone number se bind hota hai. Status: Executed via Razorpay Test API. Sirf 3 minute mein ek purani churn problem live payment links mein convert ho jati hai.",
  },
  {
    id: 'failure',
    startSec: 255,
    endSec: 280,
    timestampLabel: '4:15–4:40',
    title: 'Failure Scenario & Safe Stop Protocol',
    subtitle: 'Handling 504 timeouts with backoff retries and immutable audit logs',
    quotePrompt: 'Failure scenario. API fails → agent stops safely → audit log.',
    screenVisual: 'failure',
    badge: 'Resilient Failure Handling',
    keyTakeaway: 'API drop triggers 3 retries with exponential backoff, graceful SAFE STOP protocol, zero budget leakage, and verifiable audit logging.',
    scriptEn: "Now, what happens when external infrastructure fails? Let's simulate a network timeout or Razorpay 504 Gateway Error using our built-in failure demo toggle. When the API drops, ReviveAI does NOT enter an infinite loop or double-charge the customer. Our Exponential Backoff engine retries three times with jitter. When the upstream gateway remains unavailable, our SAFE STOP protocol instantly halts the pipeline, prevents budget leakage, alerts the merchant, and creates an immutable entry in the Verifiable Audit Ledger. Every attempt, policy check, and reason is recorded with microsecond timestamps.",
    scriptHi: "Ab sawaal ye hai ki agar external infrastructure fail ho jaye to kya hoga? Hum built-in failure demo toggle se 504 Gateway Error simulate karte hain. API drop hone par ReviveAI infinite loop mein nahi jaata. Hamara engine 3 baar exponential backoff ke sath retry karta hai. Gateway unavailable hone par SAFE STOP protocol turant pipeline halt kar deta hai, budget protect karta hai aur Audit Ledger mein tamper-evident record create karta hai.",
  },
  {
    id: 'final',
    startSec: 280,
    endSec: 300,
    timestampLabel: '4:40–5:00',
    title: 'The ReviveAI Promise',
    subtitle: 'From analysis to bounded execution to verifiable truth',
    quotePrompt: '"ReviveAI doesn\'t just tell merchants what they should do. It identifies opportunities, proposes bounded actions, gets approval, executes through test APIs, and records why every action happened."',
    screenVisual: 'final',
    badge: 'Conclusion',
    keyTakeaway: 'Not just passive insights: proactive identification, bounded proposals, human approval, test-mode execution, and full auditability.',
    scriptEn: "To conclude: ReviveAI doesn't just tell merchants what they should do. It identifies opportunities, proposes bounded actions, gets approval, executes through test APIs, and records why every action happened. It is the safe, autonomous growth co-pilot built specifically for the millions of merchants powering India's digital economy. Thank you!",
    scriptHi: "Aakhir mein: ReviveAI merchants ko sirf ye nahi batata ki unhe kya karna chahiye. Ye opportunities pehchanta hai, bounded actions propose karta hai, merchant ka approval leta hai, Razorpay test APIs se execute karta hai, aur har action ki wajah record karta hai. Ye Indian merchants ka sabse safe autonomous growth co-pilot hai. Dhanyawaad!",
  },
];

interface PitchVideoStudioProps {
  onNavigateToHub?: () => void;
  onOpenApprovalModal?: () => void;
  onRunPipeline?: () => void;
}

export const PitchVideoStudio: React.FC<PitchVideoStudioProps> = ({
  onNavigateToHub,
  onOpenApprovalModal,
  onRunPipeline,
}) => {
  const [currentSec, setCurrentSec] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [viewMode, setViewMode] = useState<'video' | 'teleprompter' | 'split'>('video');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMaleVoiceActive, setIsMaleVoiceActive] = useState<boolean>(true);

  // Track active scene based on currentSec
  const activeSceneIndex = PITCH_SCENES.findIndex(
    (s) => currentSec >= s.startSec && currentSec < s.endSec
  );
  const activeScene = activeSceneIndex !== -1 ? PITCH_SCENES[activeSceneIndex] : PITCH_SCENES[0];

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize SpeechSynthesis on client
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Timer loop for video playback
  useEffect(() => {
    if (isPlaying) {
      const interval = 100 / playbackRate;
      timerRef.current = window.setInterval(() => {
        setCurrentSec((prev) => {
          if (prev >= 300) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            return 300;
          }
          return Math.min(300, +(prev + 0.1).toFixed(1));
        });
      }, interval);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate]);

  // Handle Speech Narration when scene changes or is playing
  useEffect(() => {
    if (!isPlaying || isMuted || !synthRef.current) {
      if (synthRef.current) synthRef.current.cancel();
      return;
    }

    // Cancel current speech and trigger the current scene speech
    synthRef.current.cancel();

    const textToSpeak = language === 'en' ? activeScene.scriptEn : activeScene.scriptHi;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Pick best male voice
    const voices = synthRef.current.getVoices();
    let maleVoice = voices.find(
      (v) =>
        v.lang.startsWith(language === 'en' ? 'en' : 'hi') &&
        (v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('david') ||
          v.name.toLowerCase().includes('george') ||
          v.name.toLowerCase().includes('rishi') ||
          v.name.toLowerCase().includes('guy') ||
          v.name.toLowerCase().includes('daniel') ||
          v.name.toLowerCase().includes('natural'))
    );

    if (!maleVoice) {
      // Fallback to any English or Indian English voice
      maleVoice = voices.find(
        (v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')
      );
    }

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    // Adjust pitch to sound natural & authoritative male speaker (0.85 - 0.95)
    utterance.pitch = isMaleVoiceActive ? 0.9 : 1.0;
    utterance.rate = playbackRate * 1.05;

    synthRef.current.speak(utterance);

    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [activeScene.id, isPlaying, isMuted, language, playbackRate, isMaleVoiceActive]);

  const togglePlay = () => {
    if (currentSec >= 300) {
      setCurrentSec(0);
    }
    setIsPlaying(!isPlaying);
  };

  const jumpToScene = (sec: number) => {
    if (synthRef.current) synthRef.current.cancel();
    setCurrentSec(sec);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyScript = () => {
    const fullScript = PITCH_SCENES.map(
      (s) => `[${s.timestampLabel}] ${s.title.toUpperCase()}\n${s.scriptEn}\n\n[Hinglish/Hindi]:\n${s.scriptHi}\n`
    ).join('\n---\n\n');

    navigator.clipboard.writeText(fullScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const fullScript = `# REVIVEAI PITCH VIDEO SCRIPT (5:00 DURATION)
Speaker: Male Human Presenter (Vikash Sahu - Co-Founder & Tech Lead)
Project: ReviveAI - Autonomous AI Growth Agent for Razorpay Merchants

${PITCH_SCENES.map(
  (s) => `
==================================================================
TIMECODE: ${s.timestampLabel}
SECTION: ${s.title} (${s.subtitle})
PROMPT: ${s.quotePrompt}
==================================================================

ENGLISH SCRIPT (TELEPROMPTER):
"${s.scriptEn}"

HINDI / HINGLISH SCRIPT:
"${s.scriptHi}"

KEY TAKEAWAY:
- ${s.keyTakeaway}
`
).join('\n')}
`;
    const blob = new Blob([fullScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ReviveAI_Pitch_Video_Script_5min.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Film className="w-5 h-5 text-blue-600" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              ReviveAI Pitch Video Studio
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              5-Minute Demo Flow
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Official 5:00 pitch demonstration flow featuring an animated male presenter avatar, synchronized speech narration, teleprompter, and live UI action highlights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            title="Toggle Voice & Subtitle Language"
          >
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>Voice: {language === 'en' ? 'English' : 'Hindi / Hinglish'}</span>
          </button>

          {/* Copy Script */}
          <button
            onClick={handleCopyScript}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isCopied ? 'Copied!' : 'Copy Script'}</span>
          </button>

          {/* Download Script */}
          <button
            onClick={handleDownloadScript}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Script (.txt)</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport (16:9 Cinema Box) */}
      <div className="bg-[#0B1120] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Video Header bar */}
        <div className="px-4 py-2.5 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-red-400 font-bold font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              REC &bull; 1080P HD
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 font-medium truncate max-w-[280px] sm:max-w-none">
              ReviveAI Pitch Presentation: {activeScene.timestampLabel} &bull; {activeScene.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[11px] font-mono border border-blue-700/60">
              {activeScene.badge}
            </span>
          </div>
        </div>

        {/* Video Canvas Body (Split: Male Presenter Webcam + Dynamic App Screen) */}
        <div className="relative aspect-video max-h-[540px] w-full bg-gradient-to-br from-slate-950 via-[#0a101d] to-[#0f172a] flex flex-col md:flex-row overflow-hidden">
          
          {/* 🎙️ Left: Animated Male Presenter (Vikash Sahu) */}
          <div className="w-full md:w-[38%] h-48 md:h-full bg-[#0a0f1d] border-b md:border-b-0 md:border-r border-slate-800/80 p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Studio Lighting Accents */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top Presenter Status */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-[10px] text-slate-300">
                <Radio className={`w-3 h-3 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span>{isPlaying ? 'Speaking (Live Audio)' : 'Ready to Present'}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                MIC: SHURE SM7B
              </span>
            </div>

            {/* Male Presenter Visual Avatar */}
            <div className="flex flex-col items-center justify-center my-auto z-10 py-2">
              <div className="relative">
                {/* Audio pulse ring when playing */}
                {isPlaying && (
                  <div className="absolute -inset-2.5 rounded-full bg-blue-500/20 animate-ping"></div>
                )}

                {/* Avatar frame */}
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-2 p-1 relative z-10 transition-all ${
                  isPlaying ? 'border-blue-400 shadow-lg shadow-blue-500/30' : 'border-slate-700'
                }`}>
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
                    {/* Stylized Tech Presenter Portrait */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-amber-700 via-amber-200 to-amber-100 flex items-center justify-center text-slate-900 font-extrabold text-xl shadow-md border-2 border-amber-300/40 mb-1">
                      VS
                    </div>
                    {/* Tie / Suit collar graphic */}
                    <div className="w-20 h-8 bg-slate-950 rounded-t-xl border-t border-slate-700 flex justify-center">
                      <div className="w-2.5 h-6 bg-blue-500 rounded-b-sm"></div>
                    </div>
                  </div>

                  {/* Mic on avatar badge */}
                  <div className={`absolute bottom-0 right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#0a0f1d] ${
                    isPlaying ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Sound Waveform Visualizer */}
              <div className="mt-3 flex items-center gap-1 h-5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                {[12, 24, 16, 32, 20, 28, 14, 26, 18, 10].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.max(4, (h * ((i % 3) + 1) * 0.4) % 18)}px` : '4px',
                      transition: 'height 0.15s ease',
                    }}
                    className={`w-1 rounded-full ${
                      isPlaying ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Presenter Lower-Third Identity Card */}
            <div className="bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Vikash Sahu</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span className="text-[10px] text-blue-400 font-normal">Male Presenter</span>
                  </h4>
                  <p className="text-[10px] text-slate-400">Co-Founder &amp; Tech Lead &bull; ReviveAI</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Host Audio
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 🖥️ Right: Dynamic Screencast & Mockup Highlight */}
          <div className="flex-1 bg-[#0f172a] p-4 sm:p-6 flex flex-col justify-between overflow-y-auto relative">
            
            {/* Screencast Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <span className="text-xs font-mono text-slate-400 pl-2">
                  app.reviveai.internal/{activeScene.screenVisual}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                <span>Timestamp: {activeScene.timestampLabel}</span>
              </span>
            </div>

            {/* Dynamic Screen Visual per Scene */}
            <div className="my-auto py-4">
              {activeScene.screenVisual === 'problem' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-red-950/30 border border-red-800/60 p-4 rounded-xl text-red-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                      Problem Statement
                    </span>
                    <p className="text-sm font-semibold italic text-white">
                      {activeScene.quotePrompt}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                      <p className="text-slate-400 text-[11px]">Merchant Reality</p>
                      <p className="text-white font-bold mt-1">Lakhs of Raw Rows</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Logs in Razorpay with zero manual bandwidth</p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                      <p className="text-slate-400 text-[11px]">Silent Leakage</p>
                      <p className="text-red-400 font-bold mt-1">₹1.42L GMV Stalled</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Churned users &amp; 3D Secure drop-offs</p>
                    </div>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'dashboard' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Revenue</span>
                      <span className="text-lg font-bold text-white font-mono">₹42,80,000</span>
                      <span className="text-[10px] text-emerald-400 block mt-1">+14.2% MoM</span>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Customers</span>
                      <span className="text-lg font-bold text-white font-mono">1,248</span>
                      <span className="text-[10px] text-slate-400 block mt-1">AOV: ₹1,828</span>
                    </div>
                    <div className="bg-red-950/40 border border-red-800/80 p-3 rounded-xl ring-1 ring-red-500/50">
                      <span className="text-[10px] text-red-300 uppercase font-semibold block">Failed Payments</span>
                      <span className="text-lg font-bold text-red-400 font-mono">87 drops</span>
                      <span className="text-[10px] text-red-300 block mt-1">₹1.42L At Risk</span>
                    </div>
                    <div className="bg-amber-950/40 border border-amber-800/80 p-3 rounded-xl ring-1 ring-amber-500/50">
                      <span className="text-[10px] text-amber-300 uppercase font-semibold block">At-Risk Churn</span>
                      <span className="text-lg font-bold text-amber-400 font-mono">126 users</span>
                      <span className="text-[10px] text-amber-300 block mt-1">&gt;60 days inactive</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-blue-950/40 border border-blue-800/50 rounded-lg text-xs text-blue-300">
                    <strong>UrbanGrip Athletics Telemetry:</strong> High-frequency transaction stream loaded from Razorpay Sandbox.
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'agents' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-white">Action: "Find Growth Opportunities"</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Orchestrator v2.4</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-900 border border-blue-500/40 p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-blue-400 block uppercase">1. Data Analyst</span>
                      <p className="text-white font-semibold text-xs mt-1">126 Lapsed Users</p>
                      <p className="text-[10px] text-slate-400 mt-1">Calculated 78.4d avg churn cycle</p>
                    </div>
                    <div className="bg-slate-900 border border-purple-500/40 p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-purple-400 block uppercase">2. Customer Agent</span>
                      <p className="text-white font-semibold text-xs mt-1">Cross-Sell Gap</p>
                      <p className="text-[10px] text-slate-400 mt-1">43 shoe buyers missing socks</p>
                    </div>
                    <div className="bg-slate-900 border border-emerald-500/40 p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-emerald-400 block uppercase">3. Campaign Agent</span>
                      <p className="text-white font-semibold text-xs mt-1">3 Formulations</p>
                      <p className="text-[10px] text-slate-400 mt-1">Bounded budget &le; ₹5,000</p>
                    </div>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'recommendation' && (
                <div className="bg-slate-900 border border-blue-500/60 p-4 rounded-xl space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold uppercase">
                      Recommended Proposal
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Est Lift: +₹58,000</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Autumn Win-Back Reactivation Campaign
                  </h4>
                  <p className="text-xs text-slate-300">
                    "I recommend a win-back campaign for 100 inactive customers with 10% bounded coupon."
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Target Sample: <strong>Rohan Varma (93 days inactive)</strong></span>
                    <span className="text-blue-400 font-mono">Budget: ₹5,000</span>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'safety' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="bg-emerald-950/40 border border-emerald-700/60 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Deterministic Policy Certification (Risk: LOW 14/100)</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Evaluated 5 strict mathematical guardrails before merchant human approval gate.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Budget Limit</span>
                      <span className="font-bold text-white">₹5,000 &le; ₹10,000</span>
                      <span className="text-emerald-400 block text-[9px]">PASSED</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Discount Cap</span>
                      <span className="font-bold text-white">10% &le; 15%</span>
                      <span className="text-emerald-400 block text-[9px]">PASSED</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Approval Gate</span>
                      <span className="font-bold text-amber-400">Human Signoff</span>
                      <span className="text-amber-400 block text-[9px]">MANDATORY</span>
                    </div>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'razorpay' && (
                <div className="bg-slate-900 border border-emerald-500/50 p-4 rounded-xl space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Executed via Razorpay Test API</span>
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800">
                      HTTP 200 OK
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Link ID:</span>
                      <span className="text-blue-400">plink_test_78942autumn10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Cohort:</span>
                      <span className="text-slate-200">100 SMS/WhatsApp Dispatches</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Webhook Registered:</span>
                      <span className="text-emerald-400">payment.captured &bull; ACTIVE</span>
                    </div>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'failure' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="bg-red-950/50 border border-red-700 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-bold text-red-300">Simulated 504 Gateway Error</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-900 text-red-200">
                      SAFE STOP ACTIVATED
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                    <p className="text-amber-400">&gt; Attempt 1: Timeout (504)</p>
                    <p className="text-amber-400">&gt; Attempt 2: Backoff Retry 800ms (504)</p>
                    <p className="text-red-400 font-bold">&gt; Attempt 3: Safe Stop triggered. Zero budget spent.</p>
                    <p className="text-emerald-400">&gt; Immutable audit entry created (ID: #log_safe_stop_09)</p>
                  </div>
                </div>
              )}

              {activeScene.screenVisual === 'final' && (
                <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/50 p-4 rounded-xl space-y-2.5 animate-in fade-in text-center">
                  <Sparkles className="w-6 h-6 text-blue-400 mx-auto" />
                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    "ReviveAI doesn't just tell merchants what they should do. It identifies opportunities, proposes bounded actions, gets approval, executes through test APIs, and records why every action happened."
                  </p>
                  <p className="text-[11px] text-blue-300 font-medium">
                    The Autonomous AI Growth Agent for Razorpay Merchants
                  </p>
                </div>
              )}
            </div>

            {/* Closed Captions / Subtitles Bar */}
            <div className="mt-auto pt-3 border-t border-slate-800/80">
              <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block mb-1">
                  SUBTITLES ({language === 'en' ? 'ENGLISH' : 'HINDI / HINGLISH'})
                </span>
                <p className="text-xs text-white leading-relaxed font-sans">
                  {language === 'en' ? activeScene.scriptEn : activeScene.scriptHi}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-4 bg-[#0F172A] border-t border-slate-800 space-y-3">
          {/* Progress timeline with interactive chapter points */}
          <div className="space-y-1">
            <div className="relative w-full h-2.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden group">
              <div
                className="h-full bg-blue-600 group-hover:bg-blue-500 transition-all rounded-full relative"
                style={{ width: `${(currentSec / 300) * 100}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            {/* Chapter labels timeline below scrubber */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-0.5">
              <span>0:00</span>
              {PITCH_SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => jumpToScene(scene.startSec)}
                  className={`hover:text-blue-400 transition-colors hidden sm:inline ${
                    activeScene.id === scene.id ? 'text-blue-400 font-bold' : ''
                  }`}
                >
                  {scene.timestampLabel.split('–')[0]}
                </button>
              ))}
              <span>5:00</span>
            </div>
          </div>

          {/* Control Buttons row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Play, Pause, Reset, Time display */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                title={isPlaying ? 'Pause Presentation' : 'Play Presentation'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => jumpToScene(0)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Restart from 0:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="font-mono text-white text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-blue-400 font-bold">{formatTime(currentSec)}</span>
                <span className="text-slate-500"> / 5:00</span>
              </div>
            </div>

            {/* Chapter jump selector */}
            <div className="hidden lg:flex items-center gap-1">
              {PITCH_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => jumpToScene(scene.startSec)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    activeScene.id === scene.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={scene.title}
                >
                  {idx + 1}. {scene.timestampLabel}
                </button>
              ))}
            </div>

            {/* Audio, Speed, and Voice Controls */}
            <div className="flex items-center gap-2">
              {/* Mute/Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={isMuted ? 'Unmute Male Voice Narration' : 'Mute Voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Speed toggle */}
              <button
                onClick={() => {
                  const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
                  setPlaybackRate(nextRate);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700/60"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              {/* Live App Action shortcut */}
              {onNavigateToHub && (
                <button
                  onClick={onNavigateToHub}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Test in Live App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown & Teleprompter Transcript Cards */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Timed Presenter Script &amp; Stage Cues (0:00 – 5:00)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Word-for-word spoken transcript matching the exact pitch requirements for Loom, YouTube, or presentation submission.
            </p>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Switch to {language === 'en' ? 'Hindi / Hinglish' : 'English'}
          </button>
        </div>

        <div className="space-y-3">
          {PITCH_SCENES.map((scene, idx) => {
            const isActive = activeScene.id === scene.id;

            return (
              <div
                key={scene.id}
                onClick={() => jumpToScene(scene.startSec)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-400'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {scene.timestampLabel}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {idx + 1}. {scene.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {scene.subtitle}
                  </span>
                </div>

                {/* Prompt requirement quote */}
                <div className="mb-2 p-2 bg-white rounded border border-slate-200 text-xs text-slate-700 italic">
                  <strong>Prompt Focus:</strong> {scene.quotePrompt}
                </div>

                {/* Spoken Script */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {language === 'en' ? scene.scriptEn : scene.scriptHi}
                </p>

                {/* Footer cue */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span><strong>Visual Cue:</strong> {scene.keyTakeaway}</span>
                  <span className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5">
                    <span>Play Scene</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
