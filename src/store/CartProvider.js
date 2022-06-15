import CartContent from "./CartContext";

import React, { useState } from "react";

const INITIAL_CART_STATE = {
  items: [],
  totalPrice: 0.0,
};

function CartProvider(props) {
  // จะใช้ useReducer ก็ได้ แต่ผมอยากใช้ useState
  const [cartState, setCartState] = useState(INITIAL_CART_STATE);

  const addItemHandler = (item) => {
    setCartState((prevCartState) => {
      const cartItems = [...prevCartState.items];
      const newTotalPrice = prevCartState.totalPrice + item.price * item.amount;
      const searchIndex = prevCartState.items.findIndex(
        (el) => el.id === item.id
      );
      if (searchIndex > -1) {
        const updatedItem = { ...cartItems[searchIndex] }; // destructering ก่อน ไม่งั้นเกิิด bug นับซ้ำ
        updatedItem.amount = item.amount + updatedItem.amount; // เอา ค่าใหม่ + ค่าเก่า
        cartItems[searchIndex] = updatedItem; // override it haha
      } else {
        cartItems.push(item);
      }

      return { items: cartItems, totalPrice: newTotalPrice };
    });
  };

  const removeItemHandler = (id) => {
    setCartState((prevCartState) => {
      let cartItems = [...prevCartState.items];
      const searchIndex = cartItems.findIndex((el) => el.id === id);
      const newTotalPrice =
        prevCartState.totalPrice - cartItems[searchIndex].price;

      const updatedItem = { ...cartItems[searchIndex] };

      if (updatedItem.amount === 1) {
        cartItems = cartItems.filter((el) => el.id !== updatedItem.id);
      } else {
        updatedItem.amount = updatedItem.amount - 1;
        cartItems[searchIndex] = updatedItem;
      }
      return {
        items: cartItems,
        totalPrice: newTotalPrice,
      };
    });
  };

  const clearCart = () => {
    setCartState(INITIAL_CART_STATE);
  };

  return (
    <CartContent.Provider
      value={{
        items: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart,
      }}
    >
      {props.children}
    </CartContent.Provider>
  );
}

export default CartProvider;
