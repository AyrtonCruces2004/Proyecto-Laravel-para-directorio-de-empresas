import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';
import '../css/app.css';

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

function Hero() {
  return (
    <section className="bg-blue-600">
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-extrabold text-white uppercase">
          DIRECTORIO DE EMPRESAS
        </h1>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
