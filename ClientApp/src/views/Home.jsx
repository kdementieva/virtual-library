import { useState, useEffect } from "react";
import React from 'react';
import Navigation from "../components/Navigation";
import Book from "../components/Book";
import Footer from "../components/Footer";
import Basket from "../components/Basket";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Home() {
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [books, setBooks] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('https://localhost:44454/api/books')
    .then((res) => {
      setBooks(res.data)
    })
  }, []);

const handleBasketVisabilityChange = () => {
  const newBasketVisibility = !isBasketVisible;
  setIsBasketVisible(newBasketVisibility);
};

const handleBookClick = (id, authorFirstName, authorLastName, title, price, description, img) => {
  const book = {
    id: id,
    title: title,
    authorFirstName: authorFirstName,
    authorLastName: authorLastName,
    price: price,
    description: description,
    img: img
  }
  localStorage.setItem('selectedBook', JSON.stringify(book));
  navigate('/book-page'); 
};


const handleAddToCart = (book) => {
  setNotification(`${book.title} została dodana do koszyka!`);

  setTimeout(() => {
    setNotification(null);
  }, 3000);
};

return (
  <>
    <Navigation onBasketVisibleChange={handleBasketVisabilityChange} />
    {isBasketVisible && <Basket onBasketVisibleChange={handleBasketVisabilityChange} />}
    
    <div className="banner">
      <img src="./src/assets/banner.jpg" alt="Banner" />
    </div>

    <main className="products main-content">
      <h2>Nasze produkty</h2>
      {notification && <div className="notification">{notification}</div>}
      <div className="products-list">
        {books ? books.map(book =>
          <Book 
            key={book.book_id} 
            id={book.book_id}
            authorFirstName={book.author.firstname}
            authorLastName={book.author.lastname}
            title={book.book_title}
            price={book.book_price}
            description={book.book_description}
            img={book.book_img}
            onAddToCart={handleAddToCart} 
            onBookClick={handleBookClick} 
          />
        ) : "Brak"}
      </div>
    </main>
    <Footer/>
  </>
);
}

export default Home;