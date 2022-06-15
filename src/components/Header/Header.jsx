import styles from "./Header.module.css";

import CartContext from "../../store/CartContext";
import { useContext, useState, useEffect } from "react";

function Header(props) {
  const [isBump, setIsBump] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = cartContext.items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  useEffect(() => {
    setIsBump(true);
    const timeId = setTimeout(() => {
      setIsBump(false);
    }, 300);
    return () => {
      clearTimeout(timeId);
    };
  }, [totalAmount]);

  const btnClass = isBump ? styles.bump : "";

  return (
    <header className={styles.header}>
      <h1>Food Order</h1>
      <button className={btnClass} onClick={props.onClick}>
        <span>My Cart </span>
        <span className={styles.badge}>{totalAmount}</span>
      </button>
    </header>
  );
}

export default Header;
