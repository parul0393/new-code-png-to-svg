import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff]/95 backdrop-blur-md border-b border-[var(--warm-brown)]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group -ml-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--warm-orange)] to-[var(--warm-peach)] rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <span className="text-xl text-[var(--warm-dark)] group-hover:text-[var(--warm-orange)] transition-colors" style={{ fontWeight: 700 }}>
                ConvertSVG
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 -mr-5">
            <Link
              to="/pricing"
              className="text-[var(--warm-brown)] hover:text-[var(--warm-orange)] transition-colors duration-300"
              style={{ fontWeight: 500 }}
            >
              Pricing
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-[var(--warm-brown)] hover:text-[var(--warm-orange)] transition-colors duration-300"
                  style={{ fontWeight: 500 }}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await logout();
                      navigate("/");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-full border-2 border-[var(--warm-brown)]/30 text-[var(--warm-brown)] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/?auth=login"
                  className="px-6 py-2.5 rounded-full border-2 border-[var(--warm-brown)]/30 text-[var(--warm-brown)] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300"
                  style={{ fontWeight: 500 }}
                >
                  Login
                </Link>

                <Link
                  to="/?auth=signup"
                  className="px-6 py-2.5 rounded-full bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--warm-brown)] hover:text-[var(--warm-orange)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <Link
              to="/pricing"
              className="block w-full text-left px-4 py-3 text-[var(--warm-brown)] hover:text-[var(--warm-orange)] hover:bg-[var(--warm-beige)]/50 rounded-xl transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              Pricing
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block w-full text-left px-4 py-3 text-[var(--warm-brown)] hover:text-[var(--warm-orange)] hover:bg-[var(--warm-beige)]/50 rounded-xl transition-all duration-300"
                  style={{ fontWeight: 500 }}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await logout();
                      navigate("/");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  disabled={loading}
                  className="block w-full text-center px-6 py-3 rounded-xl border-2 border-[var(--warm-brown)]/30 text-[var(--warm-brown)] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/?auth=login"
                  className="block w-full text-center px-6 py-3 rounded-xl border-2 border-[var(--warm-brown)]/30 text-[var(--warm-brown)] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300"
                  style={{ fontWeight: 500 }}
                >
                  Login
                </Link>

                <Link
                  to="/?auth=signup"
                  className="block w-full text-center px-6 py-3 rounded-xl bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-md"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Link>
                {/* <Link to="/dashboard" className="block w-full text-center px-6 py-3 rounded-xl border-2 border-[var(--warm-brown)]/30 text-[var(--warm-brown)] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300" style={{ fontWeight: 500 }}>
                  Dashboard
                </Link> */}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}