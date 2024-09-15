import Home from "../views/Home";
import BasketSum from "../views/BasketSum";
import AppForm from "../views/AppForm";
import BookPage from "../views/BookPage";
import Error from "../views/Error";
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket-sum" element={<BasketSum />} />
          <Route path="/error" element={<Error />} />
          <Route path="/app-form" element={<AppForm />} />
          <Route path="/book-page" element={<BookPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRouter;