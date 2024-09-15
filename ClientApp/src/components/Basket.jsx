import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import BasketItem from './BasketItem';

function Basket({ onBasketVisibleChange }) {
  const changeBasketVisibility = () => {
    onBasketVisibleChange();
  }

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (title, newAmount) => {
    const updatedCart = cart.map(item => {
      if (item.title === title) {
        return { ...item, amount: newAmount };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (title) => {
    const updatedCart = cart.filter(item => item.title !== title);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="window-content">
      <header className="window-header">
        <span className="close" onClick={changeBasketVisibility}>&times;</span>
        <h2>Wybrane książki:</h2>
      </header>
      <ul className="window-body">
        {cart.map((book, index) => (
          <BasketItem
            img = {book.img}
            key={index}
            authorFirstName={book.authorFirstName}
            authorLastName={book.authorLastName}
            title={book.title}
            price={book.price}
            initialAmount={book.amount || 1}
            updateCart={updateCart}
            removeFromCartChange={removeFromCart}/>
        ))}
      </ul>
      <footer className="window-footer">
        <Link to="/basket-sum">
          <button className="order">Zamów</button>
        </Link>
      </footer>
    </div>
  );
}

export default Basket;
