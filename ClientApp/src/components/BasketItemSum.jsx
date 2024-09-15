import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BasketItemSum({ authorFirstName, authorLastName, title, price, img, initialAmount, updateCart, removeFromCartChange }) {
  const [amountValue, setAmountValue] = useState(initialAmount);
  const [priceValue, setPriceValue] = useState(price * initialAmount);

  useEffect(() => {
    setPriceValue(Math.round(price * amountValue * 100) / 100);
  }, [amountValue, price]);

  const increaseAmount = () => {
    var newAmountValue = amountValue + 1;
    setAmountValue(newAmountValue);
    updateCart(title, newAmountValue);
  }

  const decreaseAmount = () => {
    var newAmountValue = amountValue - 1;
    if (newAmountValue >= 1) {
      setAmountValue(newAmountValue);
      updateCart(title, newAmountValue);
    } else {
      removeFromCartChange(title);
    }
  }

  const removeFromCart = () => {
    removeFromCartChange(title);
  };

  return (
    <li className="basket-item">
      <div>
      <img src={`/books/${img}`} alt={title} />
      </div>
      <div className="book-name">
        <h3>{title}</h3>
        <h3>{authorFirstName} {authorLastName}</h3>
      </div>
      <div>
        <button className="amount-btn"  onClick={decreaseAmount}>
        <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" style={{color: "#411a94",}}/>
        </button>
        <span className="amount-value">{amountValue}</span>
        <button className="amount-btn" onClick={increaseAmount}>
        <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" style={{color: "#411a94",}}/>
        </button>
      </div>
      <div>
        <span className="amount-value">{priceValue} zł</span>
      </div>
      <div>
      <button className="basket" onClick={removeFromCart}>
      <FontAwesomeIcon icon="fa-solid fa-trash-can" size="2xl" style={{color: "#411a94",}} />
      </button>
      </div>
    </li>
  );
}

export default BasketItemSum;