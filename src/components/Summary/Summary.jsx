import Wrapper from "../UI/Wrapper";

import styles from "./Summary.module.css";

function Summary() {
  return (
    <Wrapper class={styles.summary}>
        <h2>Food Order Summary</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
          explicabo id inventore blanditiis ea nemo recusandae dolores, commodi
          aspernatur libero praesentium sapiente officiis, totam eius nostrum
          laudantium molestias a ut. นี่คือแอปตัวอย่าง ระบบสั่งอาหารงอย่างง่าย
          โดยใช้ firebase realtime database เป็นฐานข้อมูลจ๊ะ
        </p>
    </Wrapper>
  );
}

export default Summary;
