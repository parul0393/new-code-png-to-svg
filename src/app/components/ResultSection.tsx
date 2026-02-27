import { Download, RefreshCw, Check } from 'lucide-react';

interface ResultSectionProps {
  originalUrl: string;
  svgResult: string;
  onReset: () => void;
}

export function ResultSection({ originalUrl, svgResult, onReset }: ResultSectionProps) {
  const handleDownload = () => {
    const blob = new Blob([svgResult], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-image.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Extract dimensions from SVG if available
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgResult)}`;

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Success message */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl" style={{ fontWeight: 600 }}>
          Conversion Complete!
        </h2>
      </div>

      {/* Before/After comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Original PNG */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl" style={{ fontWeight: 500 }}>Original PNG</h3>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <img
              src={originalUrl}
              alt="Original"
              className="w-full h-auto max-h-80 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Converted SVG */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl" style={{ fontWeight: 500 }}>Converted SVG</h3>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <img
              src={svgDataUrl}
              alt="Converted SVG"
              className="w-full h-auto max-h-80 object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={handleDownload}
          className="
            px-8 py-4 rounded-full
            bg-[var(--warm-orange)] text-white
            hover:bg-[var(--warm-brown)]
            transition-all duration-300
            shadow-lg hover:shadow-xl
            transform hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
          style={{ fontWeight: 500 }}
        >
          <Download className="w-5 h-5" />
          <span>Download SVG</span>
        </button>

        <button
          onClick={onReset}
          className="
            px-8 py-4 rounded-full
            bg-white text-[var(--warm-brown)]
            border-2 border-[var(--warm-brown)]/30
            hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)]
            transition-all duration-300
            shadow-lg hover:shadow-xl
            transform hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
          style={{ fontWeight: 500 }}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Convert Another</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}