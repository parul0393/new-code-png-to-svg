import { useMemo, useState } from "react"
import { handleForgotPassword, handleGoogleLogin } from "../../services/auth"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"

export type AuthView = "login" | "signup"

export function AuthCard({
  view,
  onChangeView,
  onClose,
}: {
  view: AuthView
  onChangeView: (next: AuthView) => void
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [forgotMode, setForgotMode] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [name, setName] = useState("")
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const passwordsMatch = password === confirmPassword

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false
    if (view === "login") {
      if (forgotMode) return true
      return password.length > 0
    }
    if (!name.trim()) return false
    if (!password) return false
    if (!confirmPassword) return false
    if (!passwordsMatch) return false
    return true
  }, [confirmPassword, email, forgotMode, password, passwordsMatch, view])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || isBusy) return

    setIsBusy(true)
    setError(null)
    setSuccess(null)

    try {
      if (view === "login") {
        if (forgotMode) {
          await handleForgotPassword(email.trim())
          setSuccess("Password reset link sent. Check your email inbox.")
          return
        }
        await login(email.trim(), password)
        setSuccess("Logged in successfully.")
        navigate('/')
        return
      }

      await signup(email.trim(), password, name.trim())
      setSuccess("Signup successful. You are now logged in.")
      setForgotMode(false)
      navigate('/')
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.")
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="w-full max-w-lg relative rounded-3xl border-2 border-[var(--warm-brown)]/20 bg-white/70 shadow-lg p-8 md:p-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-2">
          <h2 className="text-3xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
            {view === "login"
              ? forgotMode
                ? "Reset password"
                : "Login"
              : "Sign Up"}
          </h2>
          <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">
            {view === "login"
              ? forgotMode
                ? "Enter your email and we’ll send you a reset link."
                : "Use your email and password to continue."
              : "Create an account with email and password."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 rounded-full border border-[var(--warm-brown)]/20 text-[var(--warm-brown)] hover:text-[var(--warm-orange)] hover:border-[var(--warm-orange)] transition-colors text-sm"
          style={{ fontWeight: 600 }}
        >
          Back
        </button>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
          />
        </div>

        {view === "login" ? (
          !forgotMode && (
            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
              />
            </div>
          )
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Confirm password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
              />
              {!passwordsMatch && confirmPassword.length > 0 && (
                <div className="text-sm text-red-600">Passwords do not match.</div>
              )}
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  setError(null)
                  setSuccess(null)
                  await handleGoogleLogin()
                } catch (err: any) {
                  setError(err.message)
                }
              }}
              className="w-full py-3.5 rounded-full border border-[var(--warm-brown)]/20 bg-white hover:bg-[var(--warm-cream)] transition-all duration-300 shadow-sm hover:shadow-md text-sm"
              style={{ fontWeight: 600 }}
            >
              Continue with Google
            </button>


          </>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {success}
          </div>
        )}



        <button
          type="submit"
          disabled={!canSubmit || isBusy}
          className="w-full py-3.5 px-8 rounded-full bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontWeight: 600 }}
        >
          {isBusy
            ? "Please wait..."
            : view === "login"
              ? forgotMode
                ? "Send reset link"
                : "Login"
              : "Sign up"}
        </button>

        <div className="flex items-center justify-between pt-1">
          {view === "login" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setForgotMode(!forgotMode)
                  setError(null)
                  setSuccess(null)
                }}
                className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
                style={{ fontWeight: 600 }}
              >
                {forgotMode ? "Back to login" : "Forgot password?"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setSuccess(null)
                  setForgotMode(false)
                  onChangeView("signup")
                }}
                className="
    px-6
    py-2.5
    rounded-full
    bg-[var(--warm-orange)]
    text-white
    hover:bg-[var(--warm-brown)]
    transition-all
    duration-300
    shadow-sm
    hover:shadow-md
    text-sm
  "
                style={{ fontWeight: 600 }}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setSuccess(null)
                  setForgotMode(false)
                  onChangeView("login")
                }}
                className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Already have an account?
              </button>

              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setSuccess(null)
                  setForgotMode(false)
                  onChangeView("login")
                }}
                className="
    px-6
    py-2.5
    rounded-full
    bg-[var(--warm-orange)]
    text-white
    hover:bg-[var(--warm-brown)]
    transition-all
    duration-300
    shadow-sm
    hover:shadow-md
    text-sm
  "
                style={{ fontWeight: 700 }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

