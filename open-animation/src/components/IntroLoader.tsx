/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INFORBadge, ZSISCBadge, CKCSCBadge, CGISCBadge, IZCCLogo } from './ClubBadge';
import { Sparkle, Sparkles } from 'lucide-react';

interface IntroLoaderProps {
  onComplete?: () => void;
}

type Mode = 'scatter' | 'merging' | 'fused';

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Mode>('scatter');

  // Timed phase transitions (no progress bar)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('merging'), 1500);  // scatter → merging
    const t2 = setTimeout(() => setPhase('fused'), 3000);     // merging → fused
    const finish = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5500); // total ~5.5s then done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-slate-200 overflow-hidden select-none font-mono px-4">

      {/* Subtle decorative rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[200px] h-[200px] rounded-full border border-yellow-900/20" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-yellow-900/15 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-yellow-900/10" />
        <div className="absolute h-full w-[1px] bg-yellow-900/40" />
        <div className="absolute w-full h-[1px] bg-yellow-900/40" />
      </div>

      {/* MAIN ANIMATION CANVAS */}
      <div className="relative w-96 h-96 flex items-center justify-center z-20">
        <AnimatePresence mode="popLayout">

          {/* THE FOUR CLUB BADGES IN FLIGHT */}
          {(phase === 'scatter' || phase === 'merging') && (
            <>
              <motion.div
                key="infor-badge"
                initial={{ opacity: 0, x: -160, y: -160, scale: 0.6 }}
                animate={
                  phase === 'scatter'
                    ? { opacity: 1, x: -95, y: -95, scale: 1, rotate: 0 }
                    : { opacity: 0.7, x: -30, y: -20, scale: 0.5, rotate: 180 }
                }
                exit={{ opacity: 0, scale: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <INFORBadge size={130} animate={true} />
              </motion.div>

              <motion.div
                key="zsisc-badge"
                initial={{ opacity: 0, x: 160, y: -160, scale: 0.6 }}
                animate={
                  phase === 'scatter'
                    ? { opacity: 1, x: 95, y: -95, scale: 1, rotate: 0 }
                    : { opacity: 0.7, x: 30, y: -20, scale: 0.5, rotate: -180 }
                }
                exit={{ opacity: 0, scale: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <ZSISCBadge size={130} animate={true} />
              </motion.div>

              <motion.div
                key="ckcsc-badge"
                initial={{ opacity: 0, x: -160, y: 160, scale: 0.6 }}
                animate={
                  phase === 'scatter'
                    ? { opacity: 1, x: -95, y: 95, scale: 1, rotate: 0 }
                    : { opacity: 0.7, x: -30, y: 20, scale: 0.5, rotate: -180 }
                }
                exit={{ opacity: 0, scale: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <CKCSCBadge size={130} animate={true} />
              </motion.div>

              <motion.div
                key="cgisc-badge"
                initial={{ opacity: 0, x: 160, y: 160, scale: 0.6 }}
                animate={
                  phase === 'scatter'
                    ? { opacity: 1, x: 95, y: 95, scale: 1, rotate: 0 }
                    : { opacity: 0.7, x: 30, y: 20, scale: 0.5, rotate: 180 }
                }
                exit={{ opacity: 0, scale: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <CGISCBadge size={130} animate={true} />
              </motion.div>
            </>
          )}

          {/* MERGING SPIRAL RINGS */}
          {phase === 'merging' && (
            <motion.div
              key="merging-energy"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute flex items-center justify-center w-full h-full pointer-events-none"
            >
              <div className="absolute w-64 h-64 border-2 border-yellow-500/20 border-dashed rounded-full animate-[spin_5s_linear_infinite]" />
              <div className="absolute w-44 h-44 border border-yellow-400/40 border-dashed rounded-full animate-[spin_2s_linear_infinite_reverse]" />
              <div className="absolute w-20 h-20 bg-yellow-600/10 blur-xl rounded-full scale-150 animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute text-yellow-400 opacity-60"
              >
                <Sparkles className="w-8 h-8 animate-pulse" />
              </motion.div>
            </motion.div>
          )}

          {/* FUSED IZCC LOGO */}
          {phase === 'fused' && (
            <motion.div
              key="fused-izcc-logo"
              initial={{ scale: 0.75, opacity: 0, filter: 'brightness(3)' }}
              animate={{ scale: 1, opacity: 1, filter: 'brightness(1)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="absolute w-[440px] px-4"
            >
              {/* Glow shockwave */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0.9 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-3xl opacity-35 pointer-events-none"
              />

              <div className="p-6 bg-yellow-950/80 border border-yellow-900/40 rounded-3xl backdrop-blur-md shadow-[0_0_80px_rgba(245,197,66,0.2)]">
                <IZCCLogo glow={true} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-sans text-yellow-400 font-extrabold uppercase bg-yellow-950/30 px-3 py-1 rounded-full border border-yellow-500/30 shadow-lg tracking-wide whitespace-nowrap"
              >
                <Sparkle className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
                <span>IZCC SYNCHRONIZATION ALIGNED</span>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};
