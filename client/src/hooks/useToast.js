import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Custom hook para mostrar notificaciones toast
 * Expone showToast(message, type) donde type es 'success' | 'error' | 'info'
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast debe usarse dentro de un ToastProvider');
  return context;
};