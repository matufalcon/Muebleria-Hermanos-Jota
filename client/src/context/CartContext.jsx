import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Al inicializar, intentamos leer el carrito guardado en localStorage
  // Si no hay nada guardado, empezamos con array vacío
  const [cart, setCart] = useState(() => {
    try{
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    catch(error){
      return [];
    }
  })

  // Cada vez que el carrito cambia, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getId = (item) => item._id || item.id;

  const addItem = (item) => {
    const itemId = getId(item);
    setCart(prevCart => {
      const exists = prevCart.find((i) => getId(i) === itemId);
      if (exists) {
        return prevCart.map((i) => 
          getId(i) === itemId
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prevCart, { ...item, cantidad: 1 }];
    });    
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter((i) => getId(i) !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart( prevCart =>
      prevCart.map((i) =>
        getId(i) === id ? { ...i, cantidad: Number(newQuantity) } : i
      )
    );
  };

  const incrementItem = (id) => {
    setCart(prevCart =>
      prevCart.map((i) => 
        getId(i) === id ? { ...i, cantidad: i.cantidad + 1} : i
      )
    );
  };

  const decrementItem = (id) => {
    setCart(prevCart =>
      prevCart.map((i) =>
        getId(i) === id && i.cantidad > 1
        ? { ...i, cantidad: i.cantidad - 1 }
        : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.precio || 0) * item.cantidad,
    0
  )

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        incrementItem,
        decrementItem,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
