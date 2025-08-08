import React, { useState, useEffect } from 'react';
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
function EmpresaModal({ empresa, onClose }) {
  if (!empresa) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Avatar / placeholder circular */}
        <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-gray-200 ring-1 ring-gray-300 flex items-center justify-center text-gray-500">
          500 × 500
        </div>

        {/* Título */}
        <h3 className="text-3xl font-semibold text-center mb-2">
          {empresa.nombre}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-center mb-5">{empresa.descripcion}</p>

        {/* Datos */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-white">
            <span className="font-medium text-gray-700">Teléfono:</span>
            <span className="ml-2">{empresa.telefono || '—'}</span>
          </div>
          <div className="px-4 py-3 bg-gray-50">
            <span className="font-medium text-gray-700">E-mail:</span>
            <span className="ml-2">{empresa.email || '—'}</span>
          </div>
          <div className="px-4 py-3 bg-white">
            <span className="font-medium text-gray-700">Dirección:</span>
            <span className="ml-2">{empresa.direccion || '—'}</span>
          </div>
        </div>

        {/* Botón regresar */}
        <button
          className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2"
          onClick={onClose}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null); // empresa seleccionada

  // cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    if (selected) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const filtradas = EMPRESAS.filter((e) =>
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto p-6 flex-1">
      {/* Buscador */}
      <div className="mb-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">BUSCADOR</h2>
        <input
          type="text"
          placeholder="Ingrese empresa:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
        {filtradas.length ? (
          filtradas.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="block w-full text-left px-6 py-4 hover:bg-gray-50"
            >
              <h3 className="text-2xl font-semibold text-blue-600">
                {e.nombre}
              </h3>
              <p className="text-gray-600">{e.descripcion}</p>
            </button>
          ))
        ) : (
          <p className="p-6 text-gray-500">No se encontraron empresas.</p>
        )}
      </div>

      {/* Modal */}
      <EmpresaModal empresa={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
const EMPRESAS = [
  {
    id: 1,
    nombre: 'Cliente III EIRL',
    email: 'cliente3@gmail.com',
    telefono: '999222999',
    direccion: 'Dirección de la empresa',
    descripcion: 'Lorem Ipsum is simply dummy text of the printing industry.',
    urlfoto: '', // deja vacío por ahora
  },
  {
    id: 2,
    nombre: 'Cliente II SRL',
    email: 'cliente2@gmail.com',
    telefono: '988777666',
    direccion: 'Dirección de la empresa',
    descripcion: "Lorem Ipsum has been the industry's standard dummy text.",
    urlfoto: '',
  },
  {
    id: 3,
    nombre: 'Karina SAC',
    email: 'karina@gmail.com',
    telefono: '987111222',
    direccion: 'Dirección de la empresa',
    descripcion: 'Lorem Ipsum since the 1500s.',
    urlfoto: '',
  },
];
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
