import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText, 
  Mail, 
  Cookie, 
  CheckCircle2, 
  ChevronRight,
  RefreshCw,
  UserCheck
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promptgridai.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how PromptGrid AI protects your privacy, collects and uses data, and adheres to GDPR and CCPA standards.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | PromptGrid AI',
    description: 'Learn how PromptGrid AI protects your privacy, collects and uses data, and adheres to GDPR and CCPA standards.',
    url: `${SITE_URL}/privacy`,
    siteName: 'PromptGrid AI',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 2, 2026';

  const principles = [
    {
      icon: <EyeOff className="w-5 h-5 text-[#6C5CE7] dark:text-[#A78BFA]" />,
      title: 'We Never Sell Your Data',
      desc: 'We do not monetize, rent, or sell your personal details, browsing sessions, or prompt queries to third-party data brokers.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#6C5CE7] dark:text-[#A78BFA]" />,
      title: 'End-to-End Encryption',
      desc: 'All network traffic to PromptGrid AI is enforced via TLS 1.3 / HTTPS encryption, keeping your connection private and secure.',
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#6C5CE7] dark:text-[#A78BFA]" />,
      title: 'GDPR & CCPA Ready',
      desc: 'You have full autonomy over your personal data. Request access, corrections, or complete deletion at any time.',
    },
  ];

  return (
    <div className="py-8 bg-[#FAF9FD] dark:bg-[#070A12] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <Link href="/" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
          <span>Legal</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
          <span className="text-gray-900 dark:text-white font-semibold">
            Privacy Policy
          </span>
        </nav>

        {/* Hero Header Banner */}
        <header className="rounded-[28px] bg-[#E8E4FD] dark:bg-[#131726] p-8 sm:p-10 border border-purple-100 dark:border-purple-900/30 transition-colors">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-[#0D101A] text-[#6C5CE7] dark:text-[#A78BFA] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal & Transparency</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 max-w-2xl leading-relaxed">
            At PromptGrid AI, your privacy and developer trust are our highest priorities. This policy outlines transparently how we handle information across our prompts, tools, and developer resources.
          </p>

          <div className="flex items-center gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Effective: Immediate</span>
          </div>
        </header>

        {/* Core Principles Grid */}
        <section aria-label="Core Privacy Principles" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#131722] p-5 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 flex items-center justify-center">
                {item.icon}
              </div>
              <h2 className="text-sm font-bold text-[#111827] dark:text-white">
                {item.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Document Body Card */}
        <main className="bg-white dark:bg-[#131722] rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-10 space-y-10 transition-colors">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                Information We Collect
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect minimal data strictly necessary to provide reliable prompt templates, benchmarked software alternatives, and real-time developer diagnostics:
            </p>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Voluntarily Provided Information:</strong> When you subscribe to our newsletter or submit an error report, we may collect your email address and any message content you provide.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Automated Usage Data:</strong> Anonymized telemetry such as browser type, device resolution, pages visited, referrers, and duration to optimize site speed and layout responsiveness.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Interactive Features:</strong> When you use our client-side search box or prompt clipboard copying tools, interactions run entirely inside your browser without logging keystrokes or clipboard contents.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                How We Use Your Information
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              PromptGrid AI uses gathered data strictly for legitimate operational purposes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7]" />
                  Service Quality & Delivery
                </span>
                <p>Deliver prompt engineering guides, benchmark ratings, and up-to-date LLM error workarounds seamlessly.</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7]" />
                  Infrastructure Security
                </span>
                <p>Monitor abusive requests, prevent DDoS attacks, and protect database integrity against scraping.</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7]" />
                  Editorial Communication
                </span>
                <p>Send occasional curated updates if you opt in to receive new weekly prompt drops (you can unsubscribe anytime).</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7]" />
                  Analytics & Optimization
                </span>
                <p>Determine which system prompt templates developers find most valuable to prioritize future pipeline research.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                Cookies & Local Storage
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              We employ minimal, privacy-friendly storage mechanisms:
            </p>

            <div className="p-4 rounded-2xl bg-[#EDE9FE]/50 dark:bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-start gap-3.5">
              <Cookie className="w-5 h-5 text-[#6C5CE7] dark:text-[#A78BFA] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Client-Side Preference Storage
                </p>
                <p>
                  We store your selected UI theme (<code className="text-xs font-mono bg-white dark:bg-[#0B0F19] px-1 py-0.5 rounded">light</code> or <code className="text-xs font-mono bg-white dark:bg-[#0B0F19] px-1 py-0.5 rounded">dark</code> mode) in your local storage so your visual preference persists across visits. We do not use intrusive cross-site tracking cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                4
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                Third-Party Infrastructure
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              To deliver high performance and global edge availability, we partner with industry-leading infrastructure providers under stringent data processing agreements:
            </p>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Cloud Hosting & Content Delivery Networks:</strong> Powers fast, reliable, and secure access to our website worldwide through encrypted HTTPS connections.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Secure Database & Storage Services:</strong> Protects and delivers published editorial content, guide catalogs, and site assets using enterprise-grade encryption.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">Analytics & Performance Diagnostics:</strong> Aggregates privacy-friendly, anonymized traffic insights to maintain optimal site uptime and user experience.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                5
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                Your Privacy Rights (GDPR & CCPA)
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Regardless of your geographic location, we respect your comprehensive privacy rights:
            </p>

            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
              <li>Right to request confirmation of whether we hold personal data about you.</li>
              <li>Right to request immediate deletion of your email address from our subscriber records.</li>
              <li>Right to opt out of any marketing or newsletter communications with a single click.</li>
              <li>Right to request data portability or rectification of inaccurate records.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-bold text-xs">
                6
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">
                Updates to This Policy
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              We may revise this Privacy Policy periodically as new AI prompt features, community tooling, or regulatory requirements arise. Any modifications will be reflected with an updated date at the top of this document. Continued use of PromptGrid AI signifies acceptance of those changes.
            </p>
          </section>

          {/* Section 7: Contact Card */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6C5CE7]" />
                  Questions or Data Requests?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Our privacy and data governance team responds within 48 business hours.
                </p>
              </div>

              <a
                href="mailto:privacy@promptgridai.com"
                className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4bc4] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 flex-shrink-0"
              >
                <span>Contact Privacy Team</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

        </main>

      </div>
    </div>
  );
}
