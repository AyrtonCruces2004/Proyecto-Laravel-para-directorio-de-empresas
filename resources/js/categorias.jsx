import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';
import '../css/app.css';
import Footer from './components/Footer.jsx';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AYRTON
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <a href="/" className="px-3 py-1.5 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition">Home</a>
          <a href="/categorias" className="px-3 py-1.5 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition">Categorías</a>
        </nav>
        <a href="/login" className="px-3 py-1.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">Login</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_50%,white,transparent_40%)]" />
      <div className="container mx-auto py-16 md:py-20 text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Directorio de Empresas
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl mx-auto">
          Encuentra y explora empresas de forma rápida y elegante.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 py-12">
            <div className="container mx-auto px-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">Categorías</h1>
              <p className="mt-2 text-zinc-600">Explora las categorías disponibles.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);