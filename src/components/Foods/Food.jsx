import styles from "./Food.module.css";
import FoodForm from "./FoodForm";

function Food(props) {
  const { food } = props;
  const foodPrice = `$${food.price}`;
  return (
    <li className={styles.food}>
      <div className={styles.item}>
        <div>
          <h3>{food.name}</h3>
          <p>{foodPrice}</p>
        </div>
        <p>{food.description}</p>
      </div>
      <FoodForm food={food} />
    </li>
  );
}

export default Food;
