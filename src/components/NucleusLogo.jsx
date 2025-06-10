import React from "react";

// Simple, modern, business-themed Nucleus logo (SVG)
export default function NucleusLogo({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="36" fill="#7c3aed" fillOpacity="0.12" />
      <ellipse cx="40" cy="40" rx="28" ry="12" fill="#e0c3fc" fillOpacity="0.7" />
      <ellipse cx="40" cy="40" rx="12" ry="28" fill="#8ec5fc" fillOpacity="0.7" />
      <circle cx="40" cy="40" r="14" fill="#7c3aed" fillOpacity="0.9" />
      <circle cx="40" cy="40" r="7" fill="#fff" />
      <text x="40" y="75" textAnchor="middle" fontSize="14" fill="#7c3aed" fontWeight="bold" fontFamily="Segoe UI, Arial, sans-serif">NOVA</text>
    </svg>
  );
}
