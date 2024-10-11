import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Cart from './components/Cart';
import Productdetails from './components/Productdetails';
import 'react-toastify/dist/ReactToastify.css';
import Bill from './components/Bill';
import Toastify from './components/Toastify';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={<h1 style={{ textAlign: 'center', marginTop: '200px' }}>404 Not Found</h1>}
        />
        <Route path="/productdetails/product/:id" element={<Productdetails />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
      <Toastify />
    </>
  );
}

export default App;
