import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BasketItem({ authorFirstName, authorLastName, title, price, initialAmount, updateCart, removeFromCartChange }) {
  const [amountValue, setAmountValue] = useState(initialAmount);
  const [priceValue, setPriceValue] = useState(price * initialAmount);

  useEffect(() => {
    setPriceValue(Math.round(price * amountValue * 100) / 100);
  }, [amountValue, price]);

  const increaseAmount = () => {
    const newAmountValue = amountValue + 1;
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
  };

 

  return (
    <li>
      <h3 className="basket-product-header">{authorFirstName} {authorLastName}: {title}</h3>
      <div className="basket-product-info">
        <div>
          <button className="amount-btn" onClick={decreaseAmount}>
            <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" style={{ color: "#411a94" }} />
          </button>
          <span className="amount-value">{amountValue}</span>
          <button className="amount-btn" onClick={increaseAmount}>
            <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" style={{ color: "#411a94" }} />
          </button>
        </div>
        <div>
          <span>{priceValue} zł</span>
        </div>
      </div>
    </li>
  );
}

export default BasketItem;
