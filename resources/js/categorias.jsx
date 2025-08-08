import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';
import '../css/app.css';
import Footer from './components/Footer.jsx';

function Header() {
    return (
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-extrabold text-blue-600">DIREMP</div>
          <nav className="space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/categorias" className="text-gray-700 hover:text-blue-600">Categorías</a>
          </nav>
          <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
        </div>
      </header>
    );
  }
  function App() {
    return (
      <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Footer />
        </div>
      </>
    );
  }
  const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);