"use client";

import { motion } from "framer-motion";

const KARNATAKA_PATH = "M145,25 L160,30 L175,22 L190,28 L200,40 L210,38 L220,45 L225,55 L230,65 L235,75 L228,85 L220,95 L215,110 L210,120 L205,130 L195,135 L185,140 L175,145 L165,150 L155,155 L145,160 L135,165 L125,168 L115,170 L105,175 L95,180 L85,185 L75,190 L65,195 L55,200 L50,210 L48,220 L52,230 L58,240 L65,248 L75,252 L85,250 L95,245 L105,240 L115,235 L125,230 L135,225 L145,218 L155,215 L160,205 L168,195 L172,185 L175,175 L178,165 L180,155 L182,145 L180,135 L175,125 L168,115 L160,105 L152,95 L148,85 L145,75 L142,65 L140,55 L138,45 L140,35 Z";
const ROUTE_PATH = "M195,120 L205,140 L185,165 L155,195 L140,220 L200,200 L224,100 L220,75 L215,40 L248,60";

const CITIES = [
  { label: "Chitradurga", x: 195, y: 120 },
  { label: "Davangere", x: 205, y: 140 },
  { label: "Shivamogga", x: 185, y: 165 },
  { label: "Mangaluru", x: 140, y: 220 },
  { label: "Udupi", x: 155, y: 195 },
  { label: "Hubballi", x: 220, y: 75 },
  { label: "Belagavi", x: 215, y: 40 },
  { label: "Ballari", x: 224, y: 100 },
  { label: "Bengaluru", x: 200, y: 200 },
];

export default function DeliveryMap() {
  return (
    <div className="relative w-full h-full min-h-[180px] flex items-center justify-center bg-gradient-to-br from-panel/50 via-paper to-ochre-soft/20">
      <svg viewBox="0 0 280 270" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Karnataka outline */}
        <path d={KARNATAKA_PATH} fill="none" stroke="rgba(90,61,36,0.20)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={KARNATAKA_PATH} fill="rgba(185,119,46,0.04)" stroke="none" />

        {/* Route dashed track */}
        <path d={ROUTE_PATH} fill="none" stroke="rgba(185,119,46,0.25)" strokeWidth="1.5" strokeDasharray="5 5" />

        {/* Animated truck */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path("${ROUTE_PATH}")` }}
        >
          <rect x="-6" y="-5" width="12" height="8" rx="1.5" fill="#5A3D24" />
          <rect x="-9" y="-2" width="4" height="4" rx="1" fill="#B9772E" />
          <circle cx="-5" cy="4" r="1.5" fill="#241B12" />
          <circle cx="3" cy="4" r="1.5" fill="#241B12" />
        </motion.g>

        {/* Glow dot */}
        <motion.circle
          r="2.5" fill="#B9772E"
          style={{ offsetPath: `path("${ROUTE_PATH}")` }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Cities */}
        {CITIES.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="2" fill="#5A3D24" opacity={0.6} />
            <text x={c.x + 4} y={c.y + 1} fontSize="5" fill="#6E5E4E" fontFamily="system-ui">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
