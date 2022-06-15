import styles from "./Cart.module.css";
import Wrapper from "../UI/Wrapper";
import CartItem from "./CartItem";

import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import ConfirmForm from "./ConfirmForm";

function Cart(props) {
  const [isShowForm, setIsShowForm] = useState(false);
  const cartContext = useContext(CartContext);

  const { items, addItem, clearCart, removeItem } = cartContext;
  const totalPrice = `$${cartContext.totalPrice.toFixed(2)}`;
  const hasItems = items.length > 0;

  const showOrderForm = () => {
    setIsShowForm(true);
  };

  const closeOrderForm = () => {
    setIsShowForm(false);
  };

  const cartItems = items.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={item}
        onAdd={addItem.bind(null, { ...item, amount: 1 })}
        onRemove={removeItem.bind(null, item.id)}
      />
    );
  });

  let content = (
    <React.Fragment>
      <div className={styles["cart-header"]}>
        <h3>Your Cart</h3>
        {hasItems && <button onClick={clearCart}>Clear Cart</button>}
      </div>
      <ul>{cartItems}</ul>
      <div className={styles.total}>
        <h3>Total Price:</h3>
        <p>{totalPrice}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={props.onClose}>
          Cancel
        </button>
        {hasItems && (
          <button className={styles.order} onClick={showOrderForm}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  if (isShowForm) {
    content = (
      <React.Fragment>
        <div className={styles["cart-header"]}>
          <h3>Enter Your Info</h3>
        </div>
        <ConfirmForm onClose={closeOrderForm} />
      </React.Fragment>
    );
  }

  return <Wrapper class={styles.cart}>{content}</Wrapper>;
}

export default Cart;
