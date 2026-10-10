import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-line bg-surface/95 px-4 py-3 text-sm text-heading shadow-xl shadow-black/40 backdrop-blur-md"
          >
            {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
            {toast.type === 'info' && <Info className="h-4 w-4 shrink-0 text-primary-soft" />}
            {toast.type === 'error' && <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />}
            <span className="flex-1 font-medium">{toast.text}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="rounded p-0.5 text-muted transition-colors hover:text-heading"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
