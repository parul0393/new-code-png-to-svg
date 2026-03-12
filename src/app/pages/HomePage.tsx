import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ConversionControls } from '../components/ConversionControls';
import { ProcessingState } from '../components/ProcessingState';
import { ResultSection } from '../components/ResultSection';
import { Footer } from '../components/Footer';
import { convertPngToSvg } from '../utils/converter';
import type { AuthView } from '../components/AuthCard';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../supabaseClient';
// import { canConvertAndTrack } from '../../services/usage';

export type AppState = 'initial' | 'uploaded' | 'processing' | 'result';

export interface ConversionSettings {
  smoothness: number;
  detailLevel: number;
  removeBackground: boolean;
}

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [appState, setAppState] = useState<AppState>('initial');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [svgResult, setSvgResult] = useState<string>('');
  const [settings, setSettings] = useState<ConversionSettings>({
    smoothness: 2,
    detailLevel: 3,
    removeBackground: false,
  });
  const { user } = useAuth();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAppState('uploaded');
  };

  const handleConvert = async () => {
    if (!uploadedFile) return;
  
    if (!user) {
      alert('Please log in to convert images.');
      return;
    }
  
    setAppState('processing');
  
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

       const response = await fetch("http://localhost:8000/convert", {
       method: "POST",
       headers: {
       Authorization: `Bearer ${token}`,
       },
      body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Conversion failed, need subscription.");
        setAppState('uploaded');
        return;
      }
  
      const svgText = await response.text();
setSvgResult(svgText);
      setAppState('result');
  
    }  catch (error: any) {
      console.error("REAL ERROR:", error);
      alert("Error: " + (error?.message || JSON.stringify(error)));
      setAppState('uploaded');
    }
  };

  const handleReset = () => {
    setAppState('initial');
    setUploadedFile(null);
    setPreviewUrl('');
    setSvgResult('');
    setSettings({
      smoothness: 2,
      detailLevel: 3,
      removeBackground: false,
    });
  };

  const authParam = searchParams.get('auth');
  const authView: AuthView | null =
    authParam === 'login' || authParam === 'signup' ? authParam : null;

  const setAuthView = (next: AuthView | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (next) nextParams.set('auth', next);
    else nextParams.delete('auth');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full">
        {appState === 'initial' && (
          <div className="space-y-0">
            <Header />
            <Hero
              onFileSelect={handleFileUpload}
              authView={authView}
              onAuthViewChange={setAuthView}
            />
          </div>
        )}

        {appState === 'uploaded' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
            <ConversionControls
              previewUrl={previewUrl}
              settings={settings}
              onSettingsChange={setSettings}
              onConvert={handleConvert}
              onBack={handleReset}
            />
          </div>
        )}

        {appState === 'processing' && (
          <div className="max-w-4xl mx-auto px-6 py-16">
            <ProcessingState />
          </div>
        )}

        {appState === 'result' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <ResultSection
              originalUrl={previewUrl}
              svgResult={svgResult}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}