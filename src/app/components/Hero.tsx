import { Sparkles, ArrowRight, Upload, Image as ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { AuthCard, type AuthView } from './AuthCard';

export function Hero({
  onFileSelect,
  authView,
  onAuthViewChange,
}: {
  onFileSelect: (file: File) => void;
  authView?: AuthView | null;
  onAuthViewChange?: (next: AuthView | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'image/png') {
      onFileSelect(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <section className="w-full px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight" style={{ fontWeight: 700 }}>
                PNG to SVG
                <br />
                <span className="text-[var(--warm-orange)]">Converter</span>
              </h1>
              <p className="md:text-2xl leading-relaxed text-[16px] text-[#313131]">
                Transform raster images into crisp, scalable vectors instantly. 
                High-quality conversion with AI-powered precision.
              </p>
            </div>
          </div>

          {/* Right Column - Upload Card / Auth Card */}
          <div className="flex items-center justify-center lg:justify-end animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            {authView ? (
              <AuthCard
                view={authView}
                onChangeView={(next) => onAuthViewChange?.(next)}
                onClose={() => onAuthViewChange?.(null)}
              />
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`
                  w-full max-w-lg relative rounded-3xl border-2 border-dashed p-12 md:p-16
                  cursor-pointer transition-all duration-300
                  ${
                    isDragging
                      ? 'border-[var(--warm-orange)] bg-[var(--warm-peach)]/30 scale-[0.98]'
                      : 'border-[var(--warm-brown)]/20 bg-white/50 hover:border-[var(--warm-orange)]'
                  }
                  shadow-lg
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,image/png"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-6">
                  <div
                    className={`
                      p-6 rounded-2xl transition-all duration-300
                      ${isDragging ? 'bg-[var(--warm-orange)]' : 'bg-[var(--warm-peach)]'}
                    `}
                  >
                    {isDragging ? (
                      <ImageIcon className="w-12 h-12 text-white" />
                    ) : (
                      <Upload className="w-12 h-12 text-[var(--warm-orange)]" />
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-xl md:text-2xl text-[var(--warm-brown)]" style={{ fontWeight: 500 }}>
                      {isDragging ? 'Drop your PNG here' : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-sm md:text-base text-[#313131]/60">PNG files only</p>
                  </div>

                  <button
                    className="
                      px-8 py-3 rounded-full 
                      bg-[var(--warm-orange)] text-white
                      hover:bg-[var(--warm-brown)] 
                      transition-all duration-300
                      shadow-md hover:shadow-lg
                      transform hover:scale-105
                    "
                    style={{ fontWeight: 500 }}
                  >
                    Choose File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}