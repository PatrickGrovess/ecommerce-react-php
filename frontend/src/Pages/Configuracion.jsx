import React, { useState } from 'react';

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState('direcciones');

  // Menú de opciones de configuración
  const menuOptions = [
    { id: 'direcciones', icon: 'fa-map-marker-alt', label: 'Direcciones' },
    { id: 'seguridad', icon: 'fa-shield-alt', label: 'Seguridad' },
    { id: 'pedidos', icon: 'fa-bell', label: 'Pedidos' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* SIDEBAR PRINCIPAL (El mismo que el Dashboard) */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col shadow-2xl">
         {/* ... (Aquí iría el mismo código del sidebar de tu AdminDashboard para mantener consistencia) ... */}
         <div className="p-8">
            <h2 className="text-xl font-black tracking-tighter">TECH<span className="text-indigo-400">SHOP</span></h2>
         </div>
         <nav className="flex-grow px-4 space-y-2 mt-4">
            <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-900/20">
                <i className="fas fa-cog mr-3"></i> Configuración
            </a>
         </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <header className="mb-8">
            <h1 className="text-3xl font-black text-gray-800">Centro de Control</h1>
            <p className="text-gray-500">Gestiona tus preferencias personales y seguridad de la cuenta.</p>
          </header>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex overflow-hidden min-h-[600px]">
            
            {/* PANEL LATERAL DE CONFIGURACIÓN */}
            <div className="w-72 bg-slate-50 border-r border-slate-100 p-6 flex flex-col space-y-2">
              {menuOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveTab(opt.id)}
                  className={`flex items-center px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === opt.id 
                    ? 'bg-white text-indigo-600 shadow-md shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <i className={`fas ${opt.icon} mr-3 w-5 text-center`}></i>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* ÁREA DE FORMULARIOS DINÁMICA */}
            <div className="flex-1 p-10">
              {activeTab === 'direcciones' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Direcciones de Envío</h3>
                    <button className="text-indigo-600 text-sm font-bold flex items-center hover:underline">
                      <i className="fas fa-plus mr-2"></i> Añadir Nueva
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400">
                    <i className="fas fa-map-marker-alt fa-2x mb-3"></i>
                    <p className="text-sm font-medium">No tienes direcciones registradas todavía.</p>
                  </div>
                </div>
              )}

              {activeTab === 'seguridad' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Cambiar Contraseña</h3>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Contraseña Actual</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Nueva Contraseña</label>
                      <input type="password" placeholder="Mínimo 8 caracteres" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-all">Actualizar Seguridad</button>
                  </div>
                </div>
              )}

               {activeTab === 'pedidos' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Mis Pedidos</h3>
                  </div>
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400">
                    <i className="fas fa-map-marker-alt fa-2x mb-3"></i>
                    <p className="text-sm font-medium">No tienes pedidos registrados todavía.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configuracion;