import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayOpacity?: number;
  poster?: string;
}

export default function VideoBackground({ src, className = '', overlayOpacity = 0.5, poster }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure muted property is explicitly set on the DOM node for reliable autoplay on refresh
    video.defaultMuted = true;
    video.muted = true;

    let hls: Hls | null = null;
    let isVisible = true;
    let isReady = false;

    const tryPlay = () => {
      if (!isVisible || !isReady) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const handleCanPlay = () => {
      isReady = true;
      tryPlay();
    };

    video.addEventListener('canplay', handleCanPlay);

    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      hls = new Hls({
        enableWorker: true,
        maxBufferLength: 60,
        maxMaxBufferLength: 120,
        backBufferLength: 90,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        isReady = true;
        tryPlay();
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!hls) return;
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        } else if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
          tryPlay();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari which natively supports HLS
      video.src = src;
      video.addEventListener('loadedmetadata', handleCanPlay, { once: true });
    } else {
      // Fallback for standard video formats
      video.src = src;
      video.addEventListener('loadedmetadata', handleCanPlay, { once: true });
    }

    // Only pause/resume via IntersectionObserver once the media stream is ready
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (!isReady) return;
          if (entry.isIntersecting) {
            tryPlay();
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', handleCanPlay);
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="absolute w-full h-full object-cover transform-gpu"
      />
      <div 
        className="absolute inset-0 bg-brand-primary pointer-events-none" 
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
