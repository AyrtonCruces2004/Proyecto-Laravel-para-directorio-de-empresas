import React, { useEffect, useState } from 'react';
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
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/categorias', { cache: 'no-store' });
        if (!res.ok) throw new Error('Error al cargar categorías');
        const data = await res.json();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 py-12">
            <div className="container mx-auto px-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">Categorías</h1>
              <p className="mt-2 text-zinc-600">Explora las categorías disponibles.</p>
              <div className="mt-6 rounded-xl bg-white ring-1 ring-zinc-200/70 p-4">
                {loading ? (
                  <p className="text-gray-500">Cargando…</p>
                ) : error ? (
                  <p className="text-red-600">{error}</p>
                ) : categorias.length ? (
                  <ul className="grid gap-3 md:grid-cols-3">
                    {categorias.map((c) => (
                      <li key={c.id} className="rounded-lg border border-zinc-200 p-4 bg-white">
                        <div className="text-lg font-semibold">{c.nombre}</div>
                        <div className="text-zinc-500 text-sm">{c.slug}</div>
                        {c.descripcion && (
                          <p className="text-zinc-600 mt-2 text-sm">{c.descripcion}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay categorías.</p>
                )}
              </div>
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