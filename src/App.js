import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Foods from "./components/Foods/Foods";
import Header from "./components/Header/Header";
import Summary from "./components/Summary/Summary";
import CartProvider from "./store/CartProvider";
import Modal from "./components/UI/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openCartHandler = () => {
    setShowModal(true);
  };

  const closeCartHandler = () => {
    setShowModal(false);
  };

  return (
    <CartProvider>
      {showModal && (
        <Modal onClose={closeCartHandler}>
          <Cart onClose={closeCartHandler} />
        </Modal>
      )}
      <Header onClick={openCartHandler} />
      <main>
        <Summary />
        <Foods />
      </main>
    </CartProvider>
  );
}

export default App;
