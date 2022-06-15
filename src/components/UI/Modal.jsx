import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

function Backdrop(props) {
  return <div onClick={props.onClick} className={styles.backdrop}></div>;
}

function ModalWrapper(props) {
  return <div className={styles["modal-wrapper"]}>{props.children}</div>;
}

const modalRoot = document.getElementById("modal-root");
function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, modalRoot)}
      {ReactDOM.createPortal(
        <ModalWrapper>{props.children}</ModalWrapper>,
        modalRoot
      )}
    </React.Fragment>
  );
}

export default Modal;
