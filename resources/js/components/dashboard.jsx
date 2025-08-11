import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// si no usas axios/pusher, puedes omitir './bootstrap'
import '../bootstrap';
import '../../css/app.css';

/* ========= TU HEADER (con login/salir condicional) ========= */
function Header({ user, onLogout }) {
  const isActive = (href) => (location.pathname === href);
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AYRTON
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <a
            href="/"
            className={`px-3 py-1.5 rounded-md transition ${
              isActive('/') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            Home
          </a>
          <a
            href="/categorias"
            className={`px-3 py-1.5 rounded-md transition ${
              isActive('/categorias') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            Categorías
          </a>
        </nav>

        {/* Si hay user => mostrar Salir; si no, Login */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-gray-700">Admin | {user.name}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-md border hover:bg-gray-50 transition"
            >
              Salir
            </button>
          </div>
        ) : (
          <a href="/login" className="px-3 py-1.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
            Login
          </a>
        )}
      </div>
    </header>
  );
}

/* ========= DASHBOARD (contenido base) ========= */
function Dashboard() {
  const user = window.__USER; // lo pasaste desde la blade
  const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';

  const [message] = useState("Bienvenido al panel. Aquí armamos Users / Categorías / Empresas.");

  async function onLogout() {
    // logout sin Alpine: POST /logout con CSRF
    await fetch('/logout', {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': csrf() },
      credentials: 'same-origin',
    });
    window.location = '/';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        {/* tarjetas ejemplo (puedes reemplazar por tus stats reales) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-xl border bg-white p-5 shadow">
            <div className="text-sm text-gray-500">Usuarios</div>
            <div className="mt-2 text-3xl font-bold">—</div>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow">
            <div className="text-sm text-gray-500">Categorías</div>
            <div className="mt-2 text-3xl font-bold">—</div>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow">
            <div className="text-sm text-gray-500">Empresas</div>
            <div className="mt-2 text-3xl font-bold">—</div>
          </div>
        </div>

        {/* layout tipo “segunda imagen”: sidebar + contenido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl shadow border divide-y">
            <a
  href="/components/users"
  className="w-full block text-left px-4 py-3 hover:bg-blue-50"
>
  User
</a>

              <button className="w-full text-left px-4 py-3 hover:bg-blue-50">Categoría</button>
              <button className="w-full text-left px-4 py-3 hover:bg-blue-50">Empresa</button>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-semibold mb-2">Contenido</h2>
              <p className="text-gray-600">{message}</p>
            </div>
          </section>
        </div>
      </main>

      {/* opcional: <Footer /> si lo tienes en React */}
    </div>
  );
}

/* ========= MONTAJE ========= */
const el = document.getElementById('dashboard-root');
if (el) {
  ReactDOM.createRoot(el).render(<Dashboard />);
}
