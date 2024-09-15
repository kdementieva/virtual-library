import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BasketItemSum from "../components/BasketItemSum";
import Basket from "../components/Basket";


function BasketSum() {
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const handleBasketVisabilityChange = () => {
    const newBasketVisibility = !isBasketVisible;
    setIsBasketVisible(newBasketVisibility);
  }

  const [cart, setCart] = useState([]);
  const [sumValue, setSumValue] = useState(0);

  const newSumValue = (cart) => {
    const sum = cart.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    setSumValue(sum);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    newSumValue(storedCart);
  }, []);

  const updateCart = (title, newAmount) => {
    var updatedCart = cart.map(item => {
      if (item.title === title) {
        return { ...item, amount: newAmount };
      }
      return item;
    });

    updatedCart = updatedCart.filter(item => item.amount > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    newSumValue(updatedCart);
  };

  const removeFromCart = (title) => {
    const updatedCart = cart.filter(item => item.title !== title);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    newSumValue(updatedCart);
  };

  return (
    <>
      <Navigation onBasketVisibleChange={handleBasketVisabilityChange} />
      { isBasketVisible && <Basket onBasketVisibleChange={handleBasketVisabilityChange} /> }
      <main className="main-content">
        <h1 className="basket-name">KOSZYK</h1>
        <ul>
          {cart.map((book, index) => (
          <li><BasketItemSum
            key={index}
            authorFirstName={book.authorFirstName}
            authorLastName={book.authorLastName}
            title={book.title}
            price={book.price}
            initialAmount={book.amount || 1}
            img = {book.img}
            updateCart={updateCart}
            removeFromCartChange={removeFromCart}/></li>
          ))}
        </ul>
          <div className="summary">
            <div>
              <span className="sum">Suma: </span>
              <span className="amount-value">{sumValue} zł</span>
            </div>
            
            <Link to="/app-form">
              <button className="order-btn">Przejdź do zamówienia</button>
            </Link>

            
          </div>
        </main>
        <Footer/>
    </>
  );
}

export default BasketSum;
