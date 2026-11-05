import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'w-9 h-9' }: LogoProps) {
  return (
    <div className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        {/* Rounded Squircle Outline Border */}
        <rect
          x="10"
          y="10"
          width="60"
          height="60"
          rx="18"
          className="logo-tile"
        />

        {/* Primary Bold Prompt Chevron */}
        <path
          d="M26 23L47 40L26 57"
          stroke="#6C5CE7"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Prompt Echo Line */}
        <path
          d="M44 28L54 40L44 52"
          stroke="#A78BFA"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logo-echo"
        />
      </svg>
    </div>
  );
}


