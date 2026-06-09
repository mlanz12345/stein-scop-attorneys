import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayOpacity?: number;
  poster?: string;
}

export default function VideoBackground({ src, className = '', overlayOpacity = 0.5, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.error("Error playing video:", e));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari which natively supports HLS
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Error playing video:", e));
      });
    } else {
      // Fallback for standard video formats or if HLS fails
      video.src = src;
    }
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute w-full h-full object-cover"
      />
      <div 
        className="absolute inset-0 bg-brand-primary" 
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
