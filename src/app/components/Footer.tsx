import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

export function Footer() {
  return (
    <footer className="w-full bg-[rgb(255,255,255)] border-t border-[var(--warm-brown)]/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-16 mb-8">

          {/* ✅ Left Column - Branding (UPDATED) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={logoImage}
                alt="BRND.INK Logo"
                className="h-[17px] w-auto"
              />
            </div>

            <p className="text-sm text-[#313131]/60 leading-relaxed max-w-xs">
              Convert PNG images into clean, scalable SVG files instantly.
            </p>
          </div>

          {/* ✅ Middle Column - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm text-[var(--warm-dark)] font-semibold">
              Quick Links
            </h4>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Right Column - Legal */}
          <div className="space-y-3">
            <h4 className="text-sm text-[var(--warm-dark)] font-semibold">
              Legal
            </h4>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm text-[#313131]/60 hover:text-[var(--warm-orange)] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Divider */}
        <div className="border-t border-[var(--warm-brown)]/10 pt-6">
          <p className="text-center text-sm text-[#313131]/50">
            © 2026 PNG2SVG. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

