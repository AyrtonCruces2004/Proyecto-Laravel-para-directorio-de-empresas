import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './Footer.jsx';
// Carga global (axios, csrf helpers, etc. de Laravel)
import '../bootstrap';
// Tailwind global
import '../../css/app.css';

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

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const token = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') ?? '';

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',     // <- para recibir 422 en JSON
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          password,
          remember: remember ? 'on' : '',   // Breeze espera 'remember'
        }),
      });

      if (res.ok) {
        // Éxito: Laravel redirige; aquí forzamos ir al home (o /dashboard)
        window.location = '/';
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
        setErrors(['No se pudo iniciar sesión.']);
      }
    } catch (err) {
      setErrors(['Error de red: ' + err.message]);
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="min-h-screen flex flex-col">
  {/* Header compartido */}
  <Header current="login" hideLogin />

  <main className="flex-1">
    <div className="container mx-auto px-6">
      {/* 👇 ESTE contenedor NO debe cerrarse antes del card */}
      <div className="min-h-[70vh] flex items-start justify-center">
        <div className="w-full max-w-md mt-10 bg-white rounded-xl shadow border border-gray-200 p-6">
          <h1 className="text-3xl font-extrabold text-center mb-6">LOGIN</h1>

          {!!errors.length && (
            <div className="mb-4 text-red-600 text-sm">
              <ul className="list-disc pl-5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email:"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password:"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded border hover:bg-gray-50"
              >
                {showPass ? 'Ocultar' : 'Ver'}
              </button>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2"
            >
              {loading ? 'Enviando…' : 'ENVIAR'}
            </button>
          </form>

          <div className="my-4 h-px bg-gray-200"></div>
          <p className="text-center text-gray-600 mb-3">Primera vez... debe registrarse</p>

          <a
            href="/register"
            className="block w-full text-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            REGISTRO
          </a>

          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 underline hover:text-gray-900">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</div>
  );
}

// ---- Montaje (este archivo funciona como entry también)
const mount = document.getElementById('app-login');
if (mount) {
  ReactDOM.createRoot(mount).render(<LoginCard />);
}

export default LoginCard; // opcional, por si luego lo importas en otro lado
