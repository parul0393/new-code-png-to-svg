import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import {
  Key,
  Zap,
  Plus,
  Copy,
  Check,
  Terminal,
  RefreshCw,
  AlertCircle,
  Shield,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface ApiKey {
  id: string;
  api_key: string;
  description: string;
  created_at?: string;
}

export default function DashboardPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [newKeyDescription, setNewKeyDescription] = useState("");
  const [showGenerateForm, setShowGenerateForm] = useState(false);

  const getToken = useCallback(async () => {
    const session = await supabase.auth.getSession();
    return session.data.session?.access_token ?? null;
  }, []);

  const loadDashboard = useCallback(async () => {
    setError(null);
    const token = await getToken();
    if (!token) {
      setError("Not authenticated. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const [keysRes, creditsRes] = await Promise.all([
        fetch("http://localhost:8000/my-api-keys", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8000/my-api-credits", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!keysRes.ok) throw new Error("Failed to fetch API keys");
      if (!creditsRes.ok) throw new Error("Failed to fetch credits");

      const keysData = await keysRes.json();
      const creditsData = await creditsRes.json();

      console.log("API keys response:", keysData);
      console.log("API credits response:", creditsData);

      setKeys(Array.isArray(keysData) ? keysData : []);
      setCredits(
        typeof creditsData === "number"
          ? creditsData
          : creditsData?.credits ?? creditsData?.credits_remaining ?? 0
      );
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function generateKey() {
    if (isGenerating) return;
    setIsGenerating(true);
    setError(null);

    const token = await getToken();
    if (!token) {
      setError("Not authenticated");
      setIsGenerating(false);
      return;
    }

    try {
      const description = newKeyDescription.trim() || "Dashboard Key";

      const res = await fetch("http://localhost:8000/generate-api-key", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ description }),
      });

      const data = await res.json().catch(() => null);
      console.log("Generate key response:", res.status, data);

      if (!res.ok) {
        const detail =
          data?.detail || data?.message || `Server returned ${res.status}`;
        throw new Error(detail);
      }

      setNewKeyDescription("");
      setShowGenerateForm(false);
      await loadDashboard();
    } catch (err: any) {
      setError(err.message || "Failed to generate API key");
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyToClipboard(key: string, id: string) {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = key;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  }

  function maskKey(key: string) {
    if (key.length <= 12) return key;
    return key.slice(0, 8) + "••••••••" + key.slice(-4);
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--warm-cream)]">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-[var(--warm-beige)] rounded-xl w-80" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-36 bg-[var(--warm-beige)] rounded-2xl" />
              <div className="h-36 bg-[var(--warm-beige)] rounded-2xl" />
            </div>
            <div className="h-64 bg-[var(--warm-beige)] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--warm-cream)]">
      <div className="max-w-6xl mx-auto py-10 px-6 space-y-8">

        {/* ───────── Page Header ───────── */}
        <div>
          <h1
            className="text-3xl md:text-4xl text-[var(--warm-dark)] tracking-tight"
            style={{ fontWeight: 700 }}
          >
            Developer Dashboard
          </h1>
          <p className="mt-2 text-[var(--warm-brown)]/70 text-base">
            Manage your API keys, track usage, and integrate with our conversion
            API.
          </p>
        </div>

        {/* ───────── Error Banner ───────── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* ───────── Stats Grid ───────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credits Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--warm-brown)]/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--warm-orange)] to-[var(--warm-peach)]" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--warm-brown)]/60 mb-1" style={{ fontWeight: 500 }}>
                    API Credits
                  </p>
                  <p
                    className="text-4xl text-[var(--warm-dark)] tracking-tight"
                    style={{ fontWeight: 700 }}
                  >
                    {credits.toLocaleString()}
                  </p>
                  <p className="text-sm text-[var(--warm-brown)]/50 mt-1">
                    credits remaining
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--warm-orange)]/15 to-[var(--warm-peach)]/25 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[var(--warm-orange)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Keys Count Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl border border-[var(--warm-brown)]/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--warm-brown)]/40 to-[var(--warm-brown)]/20" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--warm-brown)]/60 mb-1" style={{ fontWeight: 500 }}>
                    Active API Keys
                  </p>
                  <p
                    className="text-4xl text-[var(--warm-dark)] tracking-tight"
                    style={{ fontWeight: 700 }}
                  >
                    {keys.length}
                  </p>
                  <p className="text-sm text-[var(--warm-brown)]/50 mt-1">
                    keys generated
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--warm-brown)]/8 flex items-center justify-center">
                  <Key className="w-7 h-7 text-[var(--warm-brown)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── API Keys Section ───────── */}
        <div className="bg-white rounded-2xl border border-[var(--warm-brown)]/10 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-6 py-5 border-b border-[var(--warm-brown)]/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--warm-orange)]/15 to-[var(--warm-peach)]/25 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[var(--warm-orange)]" />
              </div>
              <div>
                <h2
                  className="text-lg text-[var(--warm-dark)]"
                  style={{ fontWeight: 600 }}
                >
                  API Keys
                </h2>
                <p className="text-xs text-[var(--warm-brown)]/50">
                  Manage your authentication keys
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsLoading(true);
                  loadDashboard();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--warm-brown)]/15 text-[var(--warm-brown)] hover:bg-[var(--warm-beige)]/60 transition-all duration-200 text-sm"
                style={{ fontWeight: 500 }}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => setShowGenerateForm(!showGenerateForm)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--warm-orange)] to-[#ff8533] text-white hover:shadow-lg hover:shadow-[var(--warm-orange)]/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm"
                style={{ fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                Generate Key
              </button>
            </div>
          </div>

          {/* Generate form (inline) */}
          {showGenerateForm && (
            <div className="px-6 py-4 bg-[var(--warm-beige)]/30 border-b border-[var(--warm-brown)]/8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <input
                  type="text"
                  placeholder="Key description (e.g. Production, Staging)"
                  value={newKeyDescription}
                  onChange={(e) => setNewKeyDescription(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateKey()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--warm-brown)]/15 bg-white text-[var(--warm-dark)] placeholder:text-[var(--warm-brown)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/30 focus:border-[var(--warm-orange)]/50 transition-all text-sm"
                />
                <button
                  onClick={generateKey}
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--warm-dark)] text-white hover:bg-[var(--warm-brown)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm whitespace-nowrap"
                  style={{ fontWeight: 600 }}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Create Key
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Keys table / list */}
          {keys.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--warm-beige)]/60 flex items-center justify-center">
                <Key className="w-8 h-8 text-[var(--warm-brown)]/30" />
              </div>
              <p
                className="text-[var(--warm-dark)] text-base"
                style={{ fontWeight: 500 }}
              >
                No API keys yet
              </p>
              <p className="text-sm text-[var(--warm-brown)]/50 mt-1">
                Generate your first key to get started with the API.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--warm-beige)]/30">
                      <th className="text-left text-xs text-[var(--warm-brown)]/60 px-6 py-3" style={{ fontWeight: 600 }}>
                        API KEY
                      </th>
                      <th className="text-left text-xs text-[var(--warm-brown)]/60 px-6 py-3" style={{ fontWeight: 600 }}>
                        DESCRIPTION
                      </th>
                      <th className="text-left text-xs text-[var(--warm-brown)]/60 px-6 py-3" style={{ fontWeight: 600 }}>
                        CREATED
                      </th>
                      <th className="text-right text-xs text-[var(--warm-brown)]/60 px-6 py-3" style={{ fontWeight: 600 }}>
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--warm-brown)]/6">
                    {keys.map((k) => (
                      <tr
                        key={k.id}
                        className="hover:bg-[var(--warm-beige)]/20 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <code className="text-sm font-mono text-[var(--warm-dark)]/80 bg-[var(--warm-beige)]/40 px-2.5 py-1 rounded-lg">
                            {maskKey(k.api_key)}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[var(--warm-brown)]">
                            {k.description || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--warm-brown)]/60">
                            <Clock className="w-3.5 h-3.5" />
                            {k.created_at
                              ? format(new Date(k.created_at), "MMM d, yyyy")
                              : "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => copyToClipboard(k.api_key, k.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-[var(--warm-brown)]/12 text-[var(--warm-brown)] hover:bg-[var(--warm-beige)]/50 hover:border-[var(--warm-orange)]/30 transition-all duration-200"
                            style={{ fontWeight: 500 }}
                          >
                            {copiedKeyId === k.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-[var(--warm-brown)]/6">
                {keys.map((k) => (
                  <div key={k.id} className="px-6 py-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <code className="text-sm font-mono text-[var(--warm-dark)]/80 bg-[var(--warm-beige)]/40 px-2.5 py-1 rounded-lg break-all">
                        {maskKey(k.api_key)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(k.api_key, k.id)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-[var(--warm-brown)]/12 text-[var(--warm-brown)] hover:bg-[var(--warm-beige)]/50 transition-all"
                        style={{ fontWeight: 500 }}
                      >
                        {copiedKeyId === k.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--warm-brown)]/60">
                      <span>{k.description || "No description"}</span>
                      {k.created_at && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(k.created_at), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ───────── API Documentation ───────── */}
        <div className="bg-white rounded-2xl border border-[var(--warm-brown)]/10 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--warm-brown)]/8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--warm-dark)]/8 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[var(--warm-dark)]" />
              </div>
              <div>
                <h2
                  className="text-lg text-[var(--warm-dark)]"
                  style={{ fontWeight: 600 }}
                >
                  Quick Start
                </h2>
                <p className="text-xs text-[var(--warm-brown)]/50">
                  Convert PNG to SVG via the API
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-[var(--warm-brown)]">
              Send a <code className="text-xs bg-[var(--warm-beige)]/60 px-1.5 py-0.5 rounded font-mono">POST</code> request
              with your image file to convert it to SVG.
            </p>

            <div className="bg-[var(--warm-dark)] rounded-xl p-5 overflow-x-auto">
              <pre className="text-sm font-mono text-[var(--warm-cream)]/90 whitespace-pre leading-relaxed">
                {`curl -X POST http://localhost:8000/api/convert \\
  -H "x-api-key: YOUR_API_KEY" \\
  -F "file=@image.png"`}
              </pre>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--warm-brown)]/60">
              <Zap className="w-4 h-4 text-[var(--warm-orange)]" />
              <span>
                Each request consumes <strong className="text-[var(--warm-dark)]">1 API credit</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}