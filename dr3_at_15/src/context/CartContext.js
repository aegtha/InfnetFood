import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantidade) => {
    setCart(prevCart => {
      const itemExiste = prevCart.find(item => item.id === product.id);
      if (itemExiste) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prevCart, { ...product, quantidade }];
    });
  };

  const totalDoCarrinho = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalDoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}