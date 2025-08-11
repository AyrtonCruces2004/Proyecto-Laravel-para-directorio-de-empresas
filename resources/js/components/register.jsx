import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Footer.jsx';
// Carga global (axios/csrf/helpers de Laravel)
import '../bootstrap';
// Tailwind global
import '../../css/app.css';

// IMPORTA tu Header compartido
 // ajusta la ruta si lo tienes en otro lado

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

function RegisterCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',        // para recibir 422 en JSON
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirm,    // <-- IMPORTANTE para la validación 'confirmed'
        }),
      });

      if (res.ok) {
        window.location = '/';               // o '/dashboard'
        return;
      }

      if (res.status === 422) {
        const data = await res.json();
        setErrors(Object.values(data.errors || {}).flat());
      } else if (res.status === 429) {
        setErrors(['Demasiados intentos. Inténtalo más tarde.']);
      } else if (res.status === 419) {
        setErrors(['Sesión expirada. Recarga la página e inténtalo de nuevo.']);
      } else {
        setErrors(['No se pudo crear la cuenta.']);
      }
    } catch (err) {
      setErrors(['Error de red: ' + err.message]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-start justify-center">
      <div className="w-full max-w-md mt-10 bg-white rounded-xl shadow border border-gray-200 p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6">REGISTRO</h1>

        {!!errors.length && (
          <div className="mb-4 text-red-600 text-sm">
            <ul className="list-disc pl-5">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded border hover:bg-gray-50"
            >
              {showPass ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirmación"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(v => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded border hover:bg-gray-50"
            >
              {showConfirm ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2"
          >
            {loading ? 'Creando…' : 'CREAR CUENTA'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-gray-600 underline hover:text-gray-900">
            ¿Ya tienes cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}

function PageRegister() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header current="register" />
      <RegisterCard />
      <Footer />
    </div>
  );
}

/* Montaje (este archivo también es entry) */
const mount = document.getElementById('app-register');
if (mount) {
  ReactDOM.createRoot(mount).render(<PageRegister />);
}

export default PageRegister;
