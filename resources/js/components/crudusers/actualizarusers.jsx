import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../bootstrap';           // opcional si usas axios/pusher
import '../../../css/app.css';
import Header from '../components/shared/Header'; // ajusta ruta si está en otro sitio

const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';

function EditUserPage() {
  const userLogged = window.__USER;
  const id = window.__USER_EDIT_ID;

  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [error,   setError]   = useState(null);
  const [ok,      setOk]      = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/users/show/${id}`, { credentials:'same-origin' })
      .then(async r => { if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(u => { if(alive){ setName(u.name); setEmail(u.email); }})
      .catch(e => alive && setError(e))
      .finally(()=> alive && setLoading(false));
    return () => { alive = false };
  }, [id]);

  async function onSubmit(e){
    e.preventDefault();
    setSaving(true); setError(null); setOk(false);
    try{
      const res = await fetch(`/users/${id}`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'X-CSRF-TOKEN': csrf(),
          'Accept': 'application/json'
        },
        credentials:'same-origin',
        body: JSON.stringify({ name }),
      });
      if(!res.ok){
        if(res.status===422){
          const d = await res.json();
          throw new Error(Object.values(d.errors||{}).flat().join(', ') || 'Validación');
        }
        throw new Error(`HTTP ${res.status}`);
      }
      setOk(true);
      // opcional: regresar después de 800ms
      // setTimeout(()=> window.location = '/users', 800);
    }catch(e){
      setError(e);
    }finally{
      setSaving(false);
    }
  }

  function goBack() {
    if (history.length > 1) history.back();
    else window.location = '/users';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header current="users" hideLogin user={userLogged} onLogout={async ()=>{
        await fetch('/logout',{method:'POST',headers:{'X-CSRF-TOKEN':csrf()},credentials:'same-origin'});
        window.location='/';
      }}/>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar (opcional para mantener look) */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl shadow border divide-y">
              <a href="/users" className="block px-4 py-3 hover:bg-blue-50 font-semibold text-blue-700">User</a>
              <a href="/categorias" className="block px-4 py-3 hover:bg-blue-50">Categoría</a>
              <a href="/empresas" className="block px-4 py-3 hover:bg-blue-50">Empresa</a>
            </div>
          </aside>

          {/* Formulario */}
          <section className="md:col-span-3">
            <div className="bg-white rounded-xl shadow border">
              <div className="border-b px-6 py-3 text-sm font-semibold text-gray-600">EDITAR USER</div>
              <div className="p-6 space-y-4">
                {loading ? <div>Cargando…</div> : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    {error && <div className="text-sm text-red-600">Error: {String(error.message)}</div>}
                    {ok && <div className="text-sm text-green-600">Actualizado correctamente.</div>}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                      <input
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email:</label>
                      <input
                        value={email}
                        readOnly
                        className="mt-1 w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-600"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button type="button" onClick={goBack}
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50">
                        ← Back
                      </button>
                      <button type="submit" disabled={saving}
                        className="rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2">
                        {saving ? 'Guardando…' : 'Actualizar User'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const mount = document.getElementById('user-edit');
if (mount) ReactDOM.createRoot(mount).render(<EditUserPage />);
