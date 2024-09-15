import React, { useState, useEffect } from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Basket from '../components/Basket';

function BookPage() {
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [book, setBook] = useState(null); 

  const handleBasketVisabilityChange = () => {
    const newBasketVisibility = !isBasketVisible;
    setIsBasketVisible(newBasketVisibility);
  };

  useEffect(() => {
    const storedBook = JSON.parse(localStorage.getItem('selectedBook'));
    console.log(storedBook);
    if (storedBook) {
      setBook(storedBook);
    }
  }, []);

  if (!book) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Navigation onBasketVisibleChange={handleBasketVisabilityChange} />
      
      {isBasketVisible && <Basket onBasketVisibleChange={handleBasketVisabilityChange} />}
      
      <main className="main-content product">
        <img src={`/books/${book.img}`} alt={book.title} />
        <div className="product-details">
          <h1>{book.title}<br/>{book.authorFirstName} {book.authorLastName}</h1>
          <div className="amount-value">{book.price} zł</div>
          {/* <button className="to-basket">Do koszyka</button> */}
          <p className="description">{book.description}</p>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

export default BookPage;
