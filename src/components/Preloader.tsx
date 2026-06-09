import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('reveal');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 800);
          return 100;
        }
        return p + Math.random() * 25 + 15;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-brand-primary flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Curtain reveal */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{ originY: 0 }}
                className="absolute inset-0 bg-brand-accent z-10"
              />
            )}
          </AnimatePresence>

          <div className="relative z-20 text-center space-y-12 px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-brand-accent mb-4">Est. Johannesburg</p>
              <h1 className="text-5xl md:text-7xl font-serif text-brand-cream tracking-tight">
                Stein <span className="italic">Scop</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mt-3">Attorneys Incorporated</p>
            </motion.div>

            <div className="w-64 h-px bg-white/10 mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-accent"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] uppercase tracking-[0.5em] text-white/30"
            >
              Commercial Mastery
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
