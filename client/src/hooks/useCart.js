import { useContext } from "react"
import { CartContext } from "../context/CartContext"

/**
 * Custom hook para acceder al contexto del carrito
 * Centraliza el acceso a cart, cartTotal, cartCount y todas las acciones
 */
export const useCart = () => {
    const context = useContext(CartContext);

    if(!context) { 
        throw new Error('useCart debe usarse dentro de un CartProvider')
    }
}