import React, { useState } from 'react';
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
function Search() {
  const empresas = [
    { id: 1, nombre: 'Cliente III EIRL', descripción: 'Lorem ipsum …' },
    { id: 2, nombre: 'Cliente II SRL', descripción: 'Lorem ipsum …' },
    { id: 3, nombre: 'Karina SAC', descripción: 'Lorem ipsum …' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const filtradas = empresas.filter(e =>
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-grow container mx-auto p-6">
      <div className="mb-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">BUSCADOR</h2>
        <input
          type="text"
          placeholder="Ingrese empresa:"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
        {filtradas.length ? (
          filtradas.map(e => (
            <div key={e.id} className="px-6 py-4">
              <h3 className="text-xl font-semibold text-blue-600">
                {e.nombre}
              </h3>
              <p className="text-gray-600">{e.descripción}</p>
            </div>
          ))
        ) : (
          <p className="p-6 text-gray-500">No se encontraron empresas.</p>
        )}
      </div>
    </main>
  );
}
function Footer() {
  return (
    <footer className="bg-blue-600 text-center text-white py-4">
      © Derechos reservados | Codea App | 2023
    </footer>
  );
}
function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Search />
      <Footer />
      </div>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
