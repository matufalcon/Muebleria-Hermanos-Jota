import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook para acceder al contexto de autenticación
 * Centraliza el acceso a user, token, isAuthenticated, login y logout
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }

    return context;
}