import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import Toast from './Toast';

export type ToastState = {
  message: string;
  isVisible: boolean;
  show(message: string): void;
  hide(): void;
};

export const useToast = create<ToastState>(set => ({
  message: '',
  isVisible: false,
  show(message) {
    set({ message, isVisible: true });
  },
  hide() {
    set({ isVisible: false });
  },
}));

export default function Toasts() {
  const toast = useToast();
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (toast.isVisible) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => toast.hide(), 4000);
    }
  }, [toast.message]);

  return <Toast isVisible={toast.isVisible} message={toast.message} />;
}
