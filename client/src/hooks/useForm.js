import { useState } from "react";

/**
 * Custom hook genérico para manejo de formularios
 * Centraliza el estado, cambios y reset de cualquier form
 * @param {Object} initialValues - Valores iniciales del formulario
 */
export const useForm = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    /**
     * Maneja el cambio de cualquier input del formulario
     * Compatible con inputs de tipo text, email, password, number
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Resetea el formulario a sus valores iniciales
     */
    const resetForm = () => setFormData(initialValues);

    return {
        formData,
        error,
        setError,
        loading,
        setLoading,
        handleChange,
        resetForm
    }
}