import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import Toast from './Toast';

export enum ToastType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type ToastState = {
  message: string;
  type: ToastType;
  isVisible: boolean;
  show(message: string, type?: ToastType): void;
  hide(): void;
};

export const useToast = create<ToastState>(set => ({
  message: '',
  type: ToastType.Info,
  isVisible: false,
  show(message, type = ToastType.Info) {
    set({ message, type, isVisible: true });
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
      startTimeout();
    }
  }, [toast.message]);

  const startTimeout = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => toast.hide(), 3000);
  };

  return <Toast isVisible={toast.isVisible} message={toast.message} type={toast.type} />;
}
