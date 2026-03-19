import { useMemo, useState } from "react"
import { handleForgotPassword, handleGoogleLogin } from "../../services/auth"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

  // Password regex: At least 8 characters, 1 number, 1 special character, 1 uppercase, 1 lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  
  const passwordsMatch = password === confirmPassword
  const isPasswordValid = passwordRegex.test(password)

  const getPasswordErrors = () => {
    const errors = []
    if (password.length < 8) errors.push("at least 8 characters")
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter")
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter")
    if (!/\d/.test(password)) errors.push("one number")
    if (!/[@$!%*?&]/.test(password)) errors.push("one special character (@$!%*?&)")
    return errors
  }

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false
    
    if (view === "login") {
      if (forgotMode) return true
      return password.length > 0
    }
    
    // Signup validation
    if (!name.trim()) return false
    if (!password) return false
    if (!isPasswordValid) return false
    if (!confirmPassword) return false
    if (!passwordsMatch) return false
    
    return true
  }, [confirmPassword, email, forgotMode, password, passwordsMatch, view, name, isPasswordValid])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (view === "signup" && !passwordsMatch) {
      setError("Passwords do not match. Please make sure both passwords are identical.")
      return
    }
    if (view === "signup" && !isPasswordValid) {
      const errors = getPasswordErrors()
      setError(`Password must contain: ${errors.join(", ")}`)
      return
    }

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
                ? "Enter your email and we'll send you a reset link."
                : "Use your email and password to continue."
              : "Create an account with email and password."}
          </p>
        </div>
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
            <>
              <div className="space-y-2">
                <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                  Password
                </label>

                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
                className="w-full py-3.5 rounded-full border border-[var(--warm-brown)]/20 bg-white hover:bg-[var(--warm-cream)] transition-all duration-300 shadow-sm hover:shadow-md text-sm flex items-center justify-center gap-3"
                style={{ fontWeight: 600 }}
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.89-6.89C35.64 2.34 30.2 0 24 0 14.64 0 6.46 5.4 2.56 13.28l8.06 6.26C12.66 13.1 17.86 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24c0-1.64-.15-3.21-.42-4.73H24v9h12.7c-.55 2.96-2.2 5.47-4.7 7.15l7.24 5.63C43.98 36.78 46.5 30.84 46.5 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.62 28.54A14.5 14.5 0 0 1 9.5 24c0-1.58.27-3.11.76-4.54l-8.06-6.26A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.72l8.06-6.18z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.24-5.63c-2.01 1.35-4.59 2.15-8.65 2.15-6.14 0-11.34-3.6-13.38-8.84l-8.06 6.18C6.46 42.6 14.64 48 24 48z"
                  />
                </svg>

                Continue with Google
              </button>
            
            </>
          )
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  const value = e.target.value
                  const formatted = value
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                  setName(formatted)
                }}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Password
              </label>

              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password requirements hint */}
              {passwordTouched && !isPasswordValid && password.length > 0 && (
                <div className="text-sm text-amber-600 mt-1 space-y-1">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside pl-2">
                    <li className={password.length >= 8 ? "text-green-600" : ""}>
                      ✓ At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>
                      ✓ One lowercase letter
                    </li>
                    <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                      ✓ One uppercase letter
                    </li>
                    <li className={/\d/.test(password) ? "text-green-600" : ""}>
                      ✓ One number
                    </li>
                    <li className={/[@$!%*?&]/.test(password) ? "text-green-600" : ""}>
                      ✓ One special character (@$!%*?&)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                Confirm password
              </label>

              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40 bg-white"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password mismatch error - shows when typing */}
              {confirmPasswordTouched && !passwordsMatch && (
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
                className="w-full py-3.5 rounded-full border border-[var(--warm-brown)]/20 bg-white hover:bg-[var(--warm-cream)] transition-all duration-300 shadow-sm hover:shadow-md text-sm flex items-center justify-center gap-3"
                style={{ fontWeight: 600 }}
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.89-6.89C35.64 2.34 30.2 0 24 0 14.64 0 6.46 5.4 2.56 13.28l8.06 6.26C12.66 13.1 17.86 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24c0-1.64-.15-3.21-.42-4.73H24v9h12.7c-.55 2.96-2.2 5.47-4.7 7.15l7.24 5.63C43.98 36.78 46.5 30.84 46.5 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.62 28.54A14.5 14.5 0 0 1 9.5 24c0-1.58.27-3.11.76-4.54l-8.06-6.26A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.72l8.06-6.18z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.24-5.63c-2.01 1.35-4.59 2.15-8.65 2.15-6.14 0-11.34-3.6-13.38-8.84l-8.06 6.18C6.46 42.6 14.64 48 24 48z"
                  />
                </svg>

                <span>Continue with Google</span>
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
                ? "Send"
                : "Login"
              : "Sign up"}
        </button>

        <div className="flex items-center justify-between pt-1">
          {view === "login" && !forgotMode && (
            <button
              type="button"
              onClick={() => {
                setForgotMode(true)
                setError(null)
                setSuccess(null)
              }}
              className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Forgot password?
            </button>
          )}
        </div>
      </form>
    </div>
  )
}