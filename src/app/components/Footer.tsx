export function Footer() {
  return (
    <footer className="w-full bg-[rgb(255,255,255)] border-t border-[var(--warm-brown)]/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-16 mb-8">
          {/* Left Column - Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--warm-orange)] to-[var(--warm-brown)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10 L10 5 L15 10 L10 15 Z" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="text-lg text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
                PNG2SVG
              </span>
            </div>
            <p className="text-sm text-[#313131]/60 leading-relaxed max-w-xs">
              Convert PNG images into clean, scalable SVG files instantly.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Legal */}
          <div className="space-y-3">
            <h4 className="text-sm text-[var(--warm-dark)]" style={{ fontWeight: 600 }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--warm-brown)]/10 pt-6">
          <p className="text-center text-sm text-[#313131]/50">
            © 2026 PNG2SVG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}