import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import logoImage from '../../assets/logo.png';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState<'login' | 'signup' | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff]/95 backdrop-blur-md border-b border-[var(--warm-brown)]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* ✅ Logo (from 2nd UI) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group -ml-5">
              <img
                src={logoImage}
                alt="Logo"
                className="h-[17px] w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* ✅ Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 -mr-5">

            <Link
              to="/pricing"
              className="text-[#606060] hover:text-[var(--warm-orange)] transition-colors duration-300"
              style={{ fontWeight: 500 }}
            >
              Pricing
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-[#606060] hover:text-[var(--warm-orange)] transition-colors duration-300"
                  style={{ fontWeight: 500 }}
                >
                  Dashboard
                </Link>

                <button
                  onClick={async () => {
                    try {
                      await logout();
                      navigate("/");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-full border-2 border-[var(--warm-brown)]/30 text-[#606060] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)] transition-all duration-300 disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* ✅ Login */}
                <Link
                  to="/?auth=login"
                  onClick={() => setActiveBtn('login')}
                  className={`px-6 py-2.5 rounded-full border-2 transition-all duration-300 text-[#606060]
                    ${activeBtn === 'login'
                      ? 'bg-[var(--warm-orange)] text-white border-[var(--warm-orange)]'
                      : 'border-[var(--warm-brown)]/30 hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)]'
                    }`}
                >
                  Login
                </Link>

                {/* ✅ Signup */}
                <Link
                  to="/?auth=signup"
                  onClick={() => setActiveBtn('signup')}
                  className={`px-6 py-2.5 rounded-full border-2 transition-all duration-300
                    ${activeBtn === 'signup'
                      ? 'bg-[var(--warm-orange)] text-white border-[var(--warm-orange)]'
                      : 'border-[var(--warm-brown)]/30 text-[#606060] hover:border-[var(--warm-orange)] hover:text-[var(--warm-orange)]'
                    }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* ✅ Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#606060] hover:text-[var(--warm-orange)]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">

            <Link
              to="/pricing"
              className="block px-4 py-3 text-[#606060] hover:text-[var(--warm-orange)] hover:bg-[var(--warm-beige)]/50 rounded-xl"
            >
              Pricing
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-[#606060] hover:text-[var(--warm-orange)] hover:bg-[var(--warm-beige)]/50 rounded-xl"
                >
                  Dashboard
                </Link>

                <button
                  onClick={async () => {
                    try {
                      await logout();
                      navigate("/");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="block w-full px-6 py-3 rounded-xl border-2 border-[var(--warm-brown)]/30 text-[#606060]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/?auth=login"
                  className="block w-full text-center px-6 py-3 rounded-xl border-2 border-[var(--warm-brown)]/30 text-[#606060]"
                >
                  Login
                </Link>

                <Link
                  to="/?auth=signup"
                  className="block w-full text-center px-6 py-3 rounded-xl bg-[var(--warm-orange)] text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}