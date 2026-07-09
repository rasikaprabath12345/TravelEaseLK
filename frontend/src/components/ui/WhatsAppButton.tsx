'use client';

import { useState } from 'react';

// ── CONFIG ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '94777123456';       // ← ඔයාගේ WhatsApp number (94XXXXXXXXX)
const MESSENGER_PAGE_ID = 'traveleaselk';   // ← ඔයාගේ Facebook Page username or ID
const DEFAULT_WA_MSG = 'Hello! I am interested in booking a travel package with TravelEase LK. Could you please assist me?';
// ──────────────────────────────────────────────────────────────────────────

export default function SocialFloatingButtons() {
  const [hoveredBtn, setHoveredBtn] = useState<'wa' | 'msg' | null>(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WA_MSG)}`;
  const messengerUrl = `https://m.me/${MESSENGER_PAGE_ID}`;



  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55), 0 6px 28px rgba(37,211,102,0.3); }
          50%       { box-shadow: 0 0 0 11px rgba(37,211,102,0), 0 6px 28px rgba(37,211,102,0.3); }
        }
        @keyframes msg-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,132,255,0.5), 0 6px 28px rgba(0,132,255,0.3); }
          50%       { box-shadow: 0 0 0 11px rgba(0,132,255,0), 0 6px 28px rgba(0,132,255,0.3); }
        }
        @keyframes float-in {
          0%   { opacity:0; transform: scale(0.5) translateY(24px); }
          70%  { transform: scale(1.06) translateY(-4px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes tip-in {
          from { opacity:0; transform:translateX(10px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── Container ── */
        .social-float-wrap {
          position: fixed;
          bottom: 26px;
          right: 22px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        /* ── Each row (tooltip + button) ── */
        .social-float-row {
          display: flex;
          align-items: center;
          gap: 10px;
          animation: float-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .social-float-row:nth-child(1) { animation-delay: 0.05s; opacity:0; }
        .social-float-row:nth-child(2) { animation-delay: 0.18s; opacity:0; }

        /* ── Tooltip ── */
        .sf-tooltip {
          background: #111827;
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 7px 13px;
          border-radius: 9px;
          white-space: nowrap;
          pointer-events: none;
          animation: tip-in 0.2s ease forwards;
          box-shadow: 0 4px 18px rgba(0,0,0,0.18);
          position: relative;
        }
        .sf-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #111827;
          border-right: 0;
        }

        /* ── Button base ── */
        .sf-btn {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
          border: none;
          flex-shrink: 0;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sf-btn:hover { transform: scale(1.14); }
        .sf-btn svg { width: 28px; height: 28px; }

        /* ── WhatsApp button ── */
        .sf-btn-wa {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          animation: wa-pulse 2.6s 1s infinite;
        }
        .sf-btn-wa:hover { animation: none; box-shadow: 0 8px 36px rgba(37,211,102,0.6); }
        .sf-btn-wa svg { fill: #fff; }

        /* ── Messenger button ── */
        .sf-btn-msg {
          background: linear-gradient(135deg, #0084ff 0%, #a033ff 100%);
          animation: msg-pulse 2.6s 1.3s infinite;
        }
        .sf-btn-msg:hover { animation: none; box-shadow: 0 8px 36px rgba(0,132,255,0.55); }
        .sf-btn-msg svg { fill: #fff; }

        /* ── Dismiss X button ── */

      `}</style>

      <div className="social-float-wrap">

        {/* ── Facebook Messenger ── */}
        <div className="social-float-row">
          {hoveredBtn === 'msg' && (
            <div className="sf-tooltip">Chat on Messenger</div>
          )}
          <div style={{ position: 'relative' }}>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sf-btn sf-btn-msg"
              aria-label="Chat on Facebook Messenger"
              onMouseEnter={() => setHoveredBtn('msg')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {/* Official Messenger logo SVG */}
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.954 4 4 12.495 4 23c0 5.768 2.557 10.944 6.637 14.564.389.339.622.822.631 1.337l.128 4.176a1.5 1.5 0 002.09 1.354l4.655-2.056a1.5 1.5 0 011.013-.073A21.75 21.75 0 0024 42.5C35.046 42.5 44 34.005 44 23S35.046 4 24 4z" opacity=".1"/>
                <path d="M10.637 37.564C6.557 33.944 4 28.768 4 23 4 12.495 12.954 4 24 4s20 8.495 20 19S35.046 42.5 24 42.5c-1.763 0-3.47-.22-5.105-.635a1.5 1.5 0 00-1.013.073l-4.655 2.056a1.5 1.5 0 01-2.09-1.354l-.128-4.176a1.875 1.875 0 00-.372-1.9z" fill="url(#msg-grad)"/>
                <defs>
                  <linearGradient id="msg-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff"/>
                    <stop offset="1" stopColor="#fff" stopOpacity="0.85"/>
                  </linearGradient>
                </defs>
                <path d="M13 28.5l7.2-11.4a2 2 0 012.88-.54l5.73 4.3a1 1 0 001.2 0l7.74-5.87c1.03-.78 2.38.45 1.67 1.54L32.2 28.03a2 2 0 01-2.88.54l-5.73-4.3a1 1 0 00-1.2 0l-7.74 5.87c-1.03.78-2.38-.45-1.65-1.64z" fill="#0084ff"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── WhatsApp ── */}
        <div className="social-float-row">
          {hoveredBtn === 'wa' && (
            <div className="sf-tooltip">Chat on WhatsApp</div>
          )}
          <div style={{ position: 'relative' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sf-btn sf-btn-wa"
              aria-label="Chat on WhatsApp"
              onMouseEnter={() => setHoveredBtn('wa')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {/* Official WhatsApp logo SVG */}
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.13 6.752 3.05 9.392L1.054 31.24l6.024-1.928A15.927 15.927 0 0016.004 32C24.828 32 32 24.824 32 16S24.828 0 16.004 0zm9.268 22.588c-.382 1.08-1.904 1.978-3.12 2.24-.828.176-1.91.316-5.552-1.194-4.658-1.928-7.658-6.66-7.892-6.97-.224-.308-1.882-2.508-1.882-4.786 0-2.278 1.186-3.39 1.606-3.858.42-.468.918-.586 1.224-.586.308 0 .614.004.882.016.282.014.662-.106.946.724.294.854 1 2.886.882 2.886.088.198 0 .42-.15.6l-1.304 1.386c-.166.176-.312.366-.148.646.322.558 1.206 1.832 2.39 2.858 1.532 1.32 2.774 1.794 3.26 1.988.308.128.546.108.752-.064.228-.192 1.498-1.736 1.498-1.736.196-.268.392-.222.662-.134.27.09 1.716.81 2.01.956.294.148.49.22.562.344.072.12.072.7-.31 1.784z"/>
              </svg>
            </a>


          </div>
        </div>

      </div>
    </>
  );
}
