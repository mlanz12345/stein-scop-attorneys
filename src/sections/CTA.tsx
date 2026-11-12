import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Editable } from '../components/Editable';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const startVideo = () => {
      if (!video.getAttribute('src')) {
        video.src = '/new.mp4';
        video.load();
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const stopVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Direct contentvisibilityautostatechange listener for browsers supporting content-visibility
    const handleVisibilityChange = (event: Event) => {
      const cvEvent = event as Event & { skipped?: boolean };
      if (cvEvent.skipped) {
        stopVideo();
      } else {
        startVideo();
      }
    };

    section.addEventListener('contentvisibilityautostatechange', handleVisibilityChange);

    // IntersectionObserver ensures lazy loading and playback pausing across all browsers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startVideo();
          } else {
            stopVideo();
          }
        });
      },
      { rootMargin: '300px' }
    );

    observer.observe(section);

    return () => {
      section.removeEventListener('contentvisibilityautostatechange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto none auto 80vh',
      }}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-primary"
    >

      {/* Background video — lazy-loaded when near viewport to avoid starving Hero HLS stream */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-primary/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic text-brand-cream leading-tight tracking-tight">
            <Editable id="cta_title_1" defaultText="Secure Your Commercial Future." />
          </h2>

          <div className="max-w-xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-brand-cream/80 font-light leading-relaxed">
              <Editable id="cta_desc" defaultText="Reach out to Stein Scop Attorneys Inc. for expert commercial counsel and superior litigation strategy." />
            </p>
            <Link
              to="/contact"
              className="btn inline-block px-12 py-6 bg-brand-accent text-white uppercase tracking-[3px] text-[10px] font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Sliding glass reflection sheen effect on hover */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
              <span className="relative z-10">Contact Our Team</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
