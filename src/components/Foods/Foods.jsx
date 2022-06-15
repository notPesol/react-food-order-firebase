import Wrapper from "../UI/Wrapper";
import Food from "./Food";
import styles from "./Foods.module.css";

import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";

function Foods() {
  const { isLoading, hasError, request: fetchFoods } = useHttp();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods(
      {
        url: "https://react-http-4b1ab-default-rtdb.asia-southeast1.firebasedatabase.app/foods.json",
      },
      (data) => {
        const foods = [];
        for (const key in data) {
          foods.push({
            id: key,
            ...data[key],
          });
        }
        setFoods(foods);
      }
    );
  }, [fetchFoods]);

  const foodsContent = foods.map((food) => {
    return <Food key={food.id} food={food} />;
  });

  let content = <Loading />;
  if (!isLoading && !hasError) {
    content = <ul>{foodsContent}</ul>;
  } else if (hasError) {
    content = (
      <h3 style={{ textAlign: "center", color: "red" }}>
        Something went wrong!
      </h3>
    );
  }

  return (
    <Wrapper class={styles.foods}>
      <h2>Available Foods/รายการอาหารที่สามารถสั่งได้</h2>
      {content}
    </Wrapper>
  );
}

export default Foods;
