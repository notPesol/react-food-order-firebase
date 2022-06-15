import React, { useRef, useState } from "react";
import styles from "./ConfirmForm.module.css";

import Loading from "../UI/Loading";
import useHttp from "../../hooks/useHttp";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

const isNotEmpty = (value) => value !== "";
const isFiveChars = (value) => value.length === 5;

const DEFAULT_FORM_VALIDS = {
  firstName: true,
  lastName: true,
  postalCode: true,
  city: true,
};

function ConfirmForm(props) {
  const cartContext = useContext(CartContext);

  const firstNameInputRef = useRef("");
  const lastNameInputRef = useRef("");
  const postalCodeInputRef = useRef("");
  const cityInputRef = useRef("");

  const [formValids, setFormValid] = useState(DEFAULT_FORM_VALIDS);
  const { isLoading: isSubmitting, hasError, request: sendOrder } = useHttp();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const firstName = firstNameInputRef.current.value.trim();
    const lastName = lastNameInputRef.current.value.trim();
    const postalCode = postalCodeInputRef.current.value.trim();
    const city = cityInputRef.current.value.trim();

    const firstNameIsValid = isNotEmpty(firstName);
    const lastNameIsValid = isNotEmpty(lastName);
    const postalCodeIsValid = isFiveChars(postalCode);
    const cityIsValid = isNotEmpty(city);

    setFormValid({
      firstName: firstNameIsValid,
      lastName: lastNameIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !postalCodeIsValid ||
      !cityIsValid
    ) {
      return;
    }

    // submit form
    sendOrder({
      url: "https://react-http-4b1ab-default-rtdb.asia-southeast1.firebasedatabase.app/foods_orders.json",
      method: "POST",
      body: JSON.stringify({
        customerInfo: {
          firstName,
          lastName,
          postalCode,
          city,
        },
        orderInfo: {
          items: cartContext.items,
          totalPrice: cartContext.totalPrice,
        },
      }),
    }).then(() => {
      cartContext.clearCart();
      setIsSubmitted(true);
    });
  };

  let content = (
    <React.Fragment>
      <div
        className={`${styles.control} ${
          !formValids.firstName && styles.invalid
        }`}
      >
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" ref={firstNameInputRef} />
        {!formValids.firstName && <p>Invalid value</p>}
      </div>
      <div
        className={`${styles.control} ${
          !formValids.lastName && styles.invalid
        }`}
      >
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" ref={lastNameInputRef} />
        {!formValids.lastName && <p>Invalid value</p>}
      </div>
      <div
        className={`${styles.control} ${
          !formValids.postalCode && styles.invalid
        }`}
      >
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" ref={postalCodeInputRef} />
        {!formValids.postalCode && <p>Invalid value</p>}
      </div>
      <div
        className={`${styles.control} ${!formValids.city && styles.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValids.city && <p>Invalid value</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={props.onClose}>
          Cancel
        </button>
        <button className={styles.order}>Confirm</button>
      </div>
    </React.Fragment>
  );

  if (isSubmitting) {
    content = <Loading />;
  } else if (isSubmitted && !hasError) {
    content = (
      <React.Fragment>
        <h3>Sent Order successfully.</h3>
        <button className={styles.order} onClick={props.onClose}>
          Confirm
        </button>
      </React.Fragment>
    );
  } else if (hasError) {
    content = (
      <React.Fragment>
        <h3 style={{ textAlign: "center", color: "#e65632" }}>
          Something went wrong!
        </h3>
        <button className={styles.order} onClick={props.onClose}>
          OK
        </button>
      </React.Fragment>
    );
  }

  return <form onSubmit={submitHandler}>{content}</form>;
}

export default ConfirmForm;
