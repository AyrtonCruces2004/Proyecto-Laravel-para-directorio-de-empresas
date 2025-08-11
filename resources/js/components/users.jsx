// resources/js/components/users.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../bootstrap';            // opcional si usas axios/pusher
import '../../css/app.css'; // ajusta la ruta si tu Header está en otro sitio

function useFetchJson(url) {
  const [data,setData]=useState(null), [loading,setLoading]=useState(true), [error,setError]=useState(null);
  useEffect(()=>{ let alive=true;
    setLoading(true); setError(null);
    fetch(url,{credentials:'same-origin', headers:{Accept:'application/json'}})
      .then(async r=>{ if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(j=>alive&&setData(j))
      .catch(e=>alive&&setError(e))
      .finally(()=>alive&&setLoading(false));
    return ()=>{ alive=false };
  }, [url]);
  return {data,loading,error};
}

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
/* ----------- AQUÍ está tu tabla, dentro del mismo archivo ----------- */
function UserTable() {
  const [q,setQ] = useState('');
  const [page,setPage] = useState(1);

  const url = useMemo(()=>{
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    p.set('page', String(page));
    return `/users/data?${p.toString()}`;   // ← endpoint JSON
  }, [q, page]);

  const {data,loading,error} = useFetchJson(url);
  const rows = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">
      <input
        value={q}
        onChange={e=>{ setPage(1); setQ(e.target.value); }}
        placeholder="Buscar por nombre o email…"
        className="w-full max-w-md rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <div className="text-sm text-red-600">Error: {String(error.message)}</div>}

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NAME</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ACCIÓN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-6 text-gray-600">Cargando…</td></tr>
            ) : rows.length ? rows.map(u=>(
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{u.id}</td>
                <td className="px-4 py-3 text-sm">{u.name}</td>
                <td className="px-4 py-3">
                <a
  href={`/users/${u.id}/edit`}
  className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
>
  Editar
</a>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-500">Sin usuarios</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Página {meta.current_page} de {meta.last_page}</span>
          <div className="flex gap-1">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={meta.current_page<=1} className="px-3 py-1 rounded border disabled:opacity-50">Anterior</button>
            <button onClick={()=>setPage(p=>Math.min(meta.last_page,p+1))} disabled={meta.current_page>=meta.last_page} className="px-3 py-1 rounded border disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------- Página Users (usa Header + UserTable) ----------- */
// resources/js/components/users.jsx

function UsersPage() {
  const user = window.__USER;
  const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';
  async function onLogout() {
    await fetch('/logout',{ method:'POST', headers:{ 'X-CSRF-TOKEN': csrf() }, credentials:'same-origin' });
    window.location = '/';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header current="users" hideLogin user={user} onLogout={onLogout} />

      <main className="container mx-auto px-6 py-8">
        {/* barra de título + volver */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Usuarios</h1>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50"
          >
            ← Volver al dashboard
          </a>
        </div>

        {/* opcional: breadcrumb */}
        {/* <nav className="text-sm text-gray-500 mb-3">
          <a href="/dashboard" className="hover:underline">Dashboard</a> <span>/</span> <span className="text-gray-700">Usuarios</span>
        </nav> */}

        <UserTable />
      </main>
    </div>
  );
}


/* ----------- Montaje ----------- */
const el = document.getElementById('admin-users');
if (el) ReactDOM.createRoot(el).render(<UsersPage />);
