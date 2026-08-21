import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (equipment) => {
    console.log("ADD TO CART FUNCTION CALLED:", equipment);

    setCartItems((currentItems) => {
      console.log("CURRENT CART:", currentItems);

      const alreadyExists = currentItems.some(
        (item) => item.id === equipment.id
      );

      if (alreadyExists) {
        console.log("ALREADY EXISTS");
        return currentItems;
      }

      const updatedItems = [...currentItems, equipment];

      console.log("UPDATED CART:", updatedItems);

      return updatedItems;
    });
  };

  const removeFromCart = (equipmentId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== equipmentId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  
  const isInCart = (equipmentId) => {
    return cartItems.some((item) => item.id === equipmentId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}