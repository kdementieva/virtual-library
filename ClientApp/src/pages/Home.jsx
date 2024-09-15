import { useState } from "react";
import React from 'react';
import Navigation from "../components/Navigation";
import Book from "../components/Book";
import Footer from "../components/Footer";
import Basket from "../components/Basket";


function Home() {
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const books = [
    {
      id: 1,
      authorFirstName: "Sandra",
      authorLastName: "Vensko",
      title: "Vestules Naktssargam",
      price: 130
    },
    {
      id: 2,
      authorFirstName: "Agustina",
      authorLastName: "Bazterrica",
      title: "Cadáver exquisito",
      price: 80
    },
  ];

  const booksList = books.map(book =>
    <Book key={book.id} id={book.id} authorFirstName={book.authorFirstName} authorLastName={book.authorLastName} title={book.title} price={book.price} />
  );

  const handleBasketVisabilityChange = () => {
    const newBasketVisibility = !isBasketVisible;
    setIsBasketVisible(newBasketVisibility);
  }

  return (
    <>
        <Navigation onBasketVisibleChange={handleBasketVisabilityChange} />
        { isBasketVisible && <Basket onBasketVisibleChange={handleBasketVisabilityChange} /> }
        <div className="banner">
          <img src="./src/assets/banner.jpg" alt="Banner" />
        </div>

      <main className="products main-content">
        <h2>Nasze produkty</h2>
        <div className="products-list">
          {books.map(book =>
            <Book id={book.id} authorFirstName={book.authorFirstName} authorLastName={book.authorLastName} title={book.title} price={book.price} />
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default Home;
