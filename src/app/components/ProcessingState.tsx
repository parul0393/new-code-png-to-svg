import { Loader2 } from 'lucide-react';

export function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-24">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--warm-peach)] via-[var(--warm-orange)] to-[var(--warm-peach)] rounded-full blur-2xl opacity-50 animate-pulse" />
        
        {/* Spinner */}
        <div className="relative bg-white rounded-full p-8 shadow-2xl">
          <Loader2 className="w-16 h-16 text-[var(--warm-orange)] animate-spin" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-3xl" style={{ fontWeight: 500 }}>
          Converting your image...
        </h2>
        <p className="text-lg text-[var(--warm-brown)]/70">
          This will only take a moment
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-2 bg-[var(--warm-beige)] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[var(--warm-orange)] to-[var(--warm-peach)] rounded-full animate-[progress_2s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
