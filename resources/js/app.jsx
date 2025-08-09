import React, { useState, useEffect } from 'react';
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
        <a href="/login" className="px-3 py-1.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
          Login
        </a>
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

function EmpresaModal({ empresa, onClose }) {
  if (!empresa) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-6 relative ring-1 ring-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-gray-200 ring-1 ring-gray-300 flex items-center justify-center text-gray-500">
          500 × 500
        </div>

        <h3 className="text-3xl font-semibold text-center mb-2">
          {empresa.nombre}
        </h3>

        <p className="text-gray-600 text-center mb-5">{empresa.descripcion}</p>

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
  const [selected, setSelected] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    if (selected) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/empresas', { cache: 'no-store' });
        if (!res.ok) throw new Error('Error al cargar empresas');
        const data = await res.json();
        setEmpresas(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtradas = empresas.filter((e) =>
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto p-6 flex-1">
      <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg ring-1 ring-zinc-200/60 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">BUSCADOR</h2>
        <input
          type="text"
          placeholder="Ingrese empresa:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-zinc-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg ring-1 ring-zinc-200/60 divide-y divide-zinc-200/60">
        {loading ? (
          <p className="p-6 text-gray-500">Cargando…</p>
        ) : error ? (
          <p className="p-6 text-red-600">{error}</p>
        ) : filtradas.length ? (
          filtradas.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="group block w-full text-left px-6 py-4 hover:bg-blue-50/60 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-blue-700">
                  {e.nombre}
                </h3>
                <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition">→</span>
              </div>
              <p className="text-gray-600">{e.descripcion}</p>
            </button>
          ))
        ) : (
          <p className="p-6 text-gray-500">No se encontraron empresas.</p>
        )}
      </div>

      <EmpresaModal empresa={selected} onClose={() => setSelected(null)} />
    </main>
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
