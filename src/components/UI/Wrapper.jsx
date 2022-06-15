import styles from "./Wrapper.module.css";

function Wrapper(props) {
  const classes = `${styles.wrapper} ${props.class && props.class}`;

  return <section className={classes}>{props.children}</section>;
}

export default Wrapper;
