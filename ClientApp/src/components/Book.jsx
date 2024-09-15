import React from 'react';

function Book({ id, authorFirstName, authorLastName, title, price, onAddToCart, onBookClick, description, img }) {

  const handleAddToCart = (event) => {
    event.stopPropagation(); 
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    const newBook = {
      id,
      authorFirstName,
      authorLastName,
      title,
      price,
      img,
      amount: 1
    };

    const existingBookIndex = currentCart.findIndex(item => item.id === id);

    if (existingBookIndex !== -1) {
      currentCart[existingBookIndex].amount += 1;
    } else {
      currentCart.push(newBook);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));

    if (onAddToCart) {
      onAddToCart(newBook);
    }
  };

  return (
    <div className="book-container" onClick={() => onBookClick(id, authorFirstName, authorLastName, title, price, description, img)}>
      <div className="book">
        <img src={`/books/${img}`} alt="Book" />
        <h3>{authorFirstName} {authorLastName}: {title}</h3>
        <h3>{price} zł</h3>
        <button 
          className="to-basket" 
          onClick={handleAddToCart} 
        >
          Do koszyka
        </button>
      </div>
    </div>
  );
}

export default Book;
