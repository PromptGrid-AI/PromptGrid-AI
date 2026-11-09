'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function HeroBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <section className="pt-6 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Lavender Card - Matching Vexon Reference Exactly */}
        <div className="relative overflow-hidden rounded-[32px] bg-[#E8E4FD] dark:bg-[#131726] border border-purple-100/50 dark:border-purple-900/30 px-6 py-8 sm:px-12 sm:py-12 lg:px-14 lg:py-14 transition-colors">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: AI Prompt Engineer Character */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-purple-500/20">
                <Image
                  src="/images/hero-option-2.jpg"
                  alt="AI Prompt Architect"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Content Pitch & Email Form */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#111827] dark:text-white tracking-tight leading-[1.12] transition-colors">
                Mastering the <br />
                Power of AI Prompts <br />
                & Free Tools
              </h1>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-normal transition-colors">
                Mastering the Power of AI Prompts & Free Tools, AI tools and expansive community.
              </p>

              {/* Newsletter Form */}
              <div className="max-w-lg pt-2">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white dark:bg-[#0D101A] rounded-2xl shadow-sm border border-purple-100/80 dark:border-purple-900/40 transition-colors">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white font-semibold text-sm shadow-md shadow-purple-300/50 dark:shadow-none transition-all active:scale-95 whitespace-nowrap"
                  >
                    Get Started
                  </button>
                </form>
                {subscribed && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                    ✓ Welcome to PromptGrid AI!
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
