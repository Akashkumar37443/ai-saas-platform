import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: { type?: ToastType; title: string; message?: string; duration?: number }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', title, message, duration = 4000 }: { type?: ToastType; title: string; message?: string; duration?: number }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, type, title, message, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => addToast({ type: 'success', title, message }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ type: 'error', title, message }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ type: 'info', title, message }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ type: 'warning', title, message }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const icons = {
            success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
            error: <XCircle className="h-5 w-5 text-rose-400 shrink-0" />,
            warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
            info: <Info className="h-5 w-5 text-primary-400 shrink-0" />,
          };

          const borders = {
            success: 'border-emerald-500/30 bg-emerald-950/80 shadow-emerald-500/10',
            error: 'border-rose-500/30 bg-rose-950/80 shadow-rose-500/10',
            warning: 'border-amber-500/30 bg-amber-950/80 shadow-amber-500/10',
            info: 'border-primary-500/30 bg-slate-900/90 shadow-primary-500/10',
          };

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-up ${borders[t.type]}`}
            >
              {icons[t.type]}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white tracking-tight">{t.title}</h4>
                {t.message && <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{t.message}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-gray-400 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
