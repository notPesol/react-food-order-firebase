import styles from "./FoodForm.module.css";

import React, { useRef, useState, useContext } from "react";

import CartContent from "../../store/CartContext";

function FoodForm(props) {
  const inputRef = useRef();
  const [hasError, setHasError] = useState(false);

  const cartContext = useContext(CartContent);

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = inputRef.current.value;
    if (amount < 1) {
      setHasError(true);
      return;
    }
    // submit
    cartContext.addItem({ ...props.food, amount: +amount });
    setHasError(false);
  };

  return (
    <form className={styles["food-form"]} onSubmit={submitHandler}>
      <input type="number" min="1" defaultValue="0" ref={inputRef} />
      <button>+Add</button>
      {hasError && <p className={styles.invalid}>Invalid value.</p>}
    </form>
  );
}

export default FoodForm;
