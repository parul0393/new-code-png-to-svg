import { ArrowLeft, Sparkles } from 'lucide-react';
import type { ConversionSettings } from '../App';

interface ConversionControlsProps {
  previewUrl: string;
  settings: ConversionSettings;
  onSettingsChange: (settings: ConversionSettings) => void;
  onConvert: () => void;
  onBack: () => void;
}

export function ConversionControls({
  previewUrl,
  settings,
  onSettingsChange,
  onConvert,
  onBack,
}: ConversionControlsProps) {
  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--warm-brown)] hover:text-[var(--warm-orange)] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-4 flex flex-col">
          <h3 className="text-xl" style={{ fontWeight: 500 }}>Your Image</h3>
          <div className="bg-white rounded-2xl p-8 shadow-lg flex-1 flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 flex flex-col">
          <h3 className="text-xl" style={{ fontWeight: 500 }}>Conversion Settings</h3>

          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8 flex-1">
            {/* Smoothness */}
            <div className="space-y-3">
              <label className="block text-base">
                Smoothness
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings.smoothness}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      smoothness: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer orange-slider"
                  style={{
                    background: `linear-gradient(to right, var(--warm-orange) 0%, var(--warm-orange) ${
                      ((settings.smoothness - 1) / 4) * 100
                    }%, var(--warm-beige) ${
                      ((settings.smoothness - 1) / 4) * 100
                    }%, var(--warm-beige) 100%)`,
                  }}
                />
                <span className="text-lg w-8 text-center" style={{ fontWeight: 500 }}>
                  {settings.smoothness}
                </span>
              </div>
            </div>

            {/* Detail Level */}
            <div className="space-y-3">
              <label className="block text-base">
                Detail Level
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings.detailLevel}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      detailLevel: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer orange-slider"
                  style={{
                    background: `linear-gradient(to right, var(--warm-orange) 0%, var(--warm-orange) ${
                      ((settings.detailLevel - 1) / 4) * 100
                    }%, var(--warm-beige) ${
                      ((settings.detailLevel - 1) / 4) * 100
                    }%, var(--warm-beige) 100%)`,
                  }}
                />
                <span className="text-lg w-8 text-center" style={{ fontWeight: 500 }}>
                  {settings.detailLevel}
                </span>
              </div>
            </div>

            {/* Background Removal */}
            <div className="flex items-center justify-between p-4 bg-[var(--warm-beige)] rounded-xl">
              <label className="text-base cursor-pointer">
                Remove Background
              </label>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    removeBackground: !settings.removeBackground,
                  })
                }
                className={`
                  relative w-14 h-8 rounded-full transition-colors
                  ${
                    settings.removeBackground
                      ? 'bg-[var(--warm-orange)]'
                      : 'bg-[var(--warm-brown)]/30'
                  }
                `}
              >
                <span
                  className={`
                    absolute top-1 left-1 w-6 h-6 bg-white rounded-full
                    transition-transform duration-300
                    ${settings.removeBackground ? 'translate-x-6' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {/* Convert Button */}
            <button
              onClick={onConvert}
              className="
                w-full py-4 rounded-full
                bg-[var(--warm-orange)] text-white
                hover:bg-[var(--warm-brown)]
                transition-all duration-300
                shadow-lg hover:shadow-xl
                transform hover:scale-[1.02]
                flex items-center justify-center gap-2
              "
              style={{ fontWeight: 500 }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Convert to SVG</span>
            </button>

            <style>{`
              .orange-slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--warm-orange);
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s, box-shadow 0.2s;
              }

              .orange-slider::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
              }

              .orange-slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--warm-orange);
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s, box-shadow 0.2s;
              }

              .orange-slider::-moz-range-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
              }
            `}</style>
          </div>
        </div>
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