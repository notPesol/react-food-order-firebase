import styles from "./CartItem.module.css";

function CartItem(props) {
  const { item, onAdd, onRemove } = props;
  const itemPrice = `$${item.price.toFixed(2)}`;
  return (
    <li>
      <div>
        <h4>{item.name}</h4>
        <p>{itemPrice}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onRemove} className={styles.btn}>
          -
        </button>
        <p>{item.amount}</p>
        <button onClick={onAdd} className={styles.btn}>
          +
        </button>
      </div>
    </li>
  );
}

export default CartItem;
