import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setError(res.message || 'Terjadi kesalahan saat masuk dengan Google.');
      }
    } catch (err) {
      setError('Gagal menghubungkan ke Google. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col justify-between items-center px-4 py-8 sm:py-12 animate-fade-in">
      {/* Top spacing */}
      <div className="w-full" />

      {/* Main Login Card / Center Container */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] p-7 sm:p-9 text-center">
          
          {/* Logo Placeholder */}
          <div className="mb-6 flex justify-center">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 leading-tight">
            Penulis+ Workspace
          </h1>

          {/* Subtitle */}
          <div className="mt-3 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed tracking-tight space-y-0.5">
            <p>Temukan Ide.</p>
            <p>Tulis Cerita.</p>
            <p>Selesaikan Naskah.</p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mt-5 p-3 rounded-2xl bg-zinc-50 border border-zinc-300 text-xs font-medium text-zinc-900 text-left transition-smooth animate-slide-up">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="mt-8">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }
              className="border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold shadow-sm rounded-2xl py-3.5"
            >
              Masuk dengan Google
            </Button>
          </div>

          {/* Minimalist Micro Note */}
          <div className="mt-6 pt-5 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-600 leading-normal">
              Akses khusus penulis terpilih antologi Ranah Menulis.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4">
        <p className="text-xs font-semibold text-zinc-600 tracking-wider uppercase">
          by Ranah Menulis
        </p>
      </footer>
    </div>
  );
};
