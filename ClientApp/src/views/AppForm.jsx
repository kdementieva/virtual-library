import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Basket from "../components/Basket";

function AppForm() {
  const navigate = useNavigate();
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const handleBasketVisabilityChange = () => {
    const newBasketVisibility = !isBasketVisible;
    setIsBasketVisible(newBasketVisibility);
  }

  const order = (e) => {
    e.preventDefault(); 

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const books = storedCart.map(({id, amount}) => ({id, amount}))
    const payload = {
      firstname: e.target.name.value,
      lastname: e.target.surname.value,
      email: e.target.email.value,
      phone_number: e.target.phone.value,
      city: e.target.city.value,
      address: e.target.address.value,
      postal_code: e.target.zip.value,
      house_number: e.target.homeNumber.value,
      flat_number: e.target.flatNumber.value,
      payment_method: e.target.paymentMethod.value,
      books: books
    }

    axios.post('https://localhost:44454/api/orders', payload)
      .then(() => {
        navigate('/')
        alert('Zamówienie zostało złożone :)')
      }).catch(err => console.log(err))
  
    localStorage.clear()
  };

  return (
    <>
     <Navigation onBasketVisibleChange={handleBasketVisabilityChange} />
     { isBasketVisible && <Basket onBasketVisibleChange={handleBasketVisabilityChange} /> }
        <main className="main-content form-container">
        <form className="form" onSubmit={order}>
            <h1 className="form-name">Dane</h1>
            <label htmlFor="name">Imię<span>*</span></label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="surname">Nazwisko<span>*</span></label>
            <input type="text" id="surname" name="surname" required />
            <label htmlFor="email">Email<span>*</span></label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="phone">Telefon</label>
            <input type="tel" id="phone" name="phone" />
            <label htmlFor="city">Miasto<span>*</span></label>
            <input type="text" id="city" name="city" required />
            <label htmlFor="address">Adres<span>*</span></label>
            <input type="text" id="address" name="address" required />
            <label htmlFor="zip">Kod pocztowy<span>*</span></label>
            <input type="text" id="zip" name="zip" required />
            <label htmlFor="homeNumber">Nr domu<span>*</span></label>
            <input type="text" id="homeNumber" name="homeNumber" required />
            <label htmlFor="flatNumber">Nr mieszkania<span>*</span></label>
            <input type="text" id="flatNumber" name="flatNumber" />
            <label htmlFor="paymentMethod">Metoda płatności<span>*</span></label>
            <select id="paymentMethod" name="paymentMethod" required>
              <option value="" disabled hidden>Wybierz</option>
              <option value="Gotówka przy odbiorze">Gotówka przy odbiorze</option>
              <option value="Karta">Karta</option>
              <option value="Przelew">Przelew</option>
            </select>
            <button type="submit">Zamów</button>
          </form>
        </main>
        <Footer/>
    </>
  );
}

export default AppForm;
