import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

import { useState } from "react"

const AdminDashboard = () => {
  const { usuario, logout } = useContext(AuthContext);

  const [nombre, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("");


  const productosFiltrados = productos.filter((producto) => {
    const nombreProducto = producto.nombre.toLowerCase();
    const terminoBusqueda = busqueda.toLowerCase();

    return nombreProducto.includes(terminoBusqueda);

    console.log(nombreProducto)

  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const respuesta = await fetch("http://localhost:3001/api/prueba/crear", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, descripcion, imagen })
      })

      // console.log(respuesta);
      const resultado = await respuesta.json();
      // console.log(resultado)

      // console.log(resultado);
      if (resultado.success) {
        alert(`¡Producto creado exitosamente, ${resultado.success}!`)
        setNombreProducto("");
        setPrecio("");
        setDescripcion("");
        setImagen("");
      }
      else {
        alert(`¡Error al crear el producto, ${resultado.error}!`)
      }



    } catch (error) {
      console.log(error)
    }
  }

  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/prueba")

      // console.log(respuesta);

      const resultado = await respuesta.json()

      console.log(resultado)

      setProductos(resultado)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerDatos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR LATERAL */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col shadow-2xl">

        {/* Logo y Branding */}
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <h2 className="text-xl font-black tracking-tighter">TECH<span className="text-indigo-400">SHOP</span></h2>
          </div>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em] pl-1">Admin Central</p>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-grow px-4 space-y-2 mt-4">
          <p className="text-slate-500 text-[10px] font-bold uppercase px-4 mb-4">Menú Principal</p>

          <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-900/20 transition-all duration-200">
            <i className="fas fa-box-open mr-3 opacity-90"></i>
            <span className="text-sm font-semibold">Productos</span>
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group">
            <i className="fas fa-shopping-cart mr-3 group-hover:text-indigo-400 transition-colors"></i>
            <span className="text-sm font-medium">Pedidos</span>
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group">
            <i className="fas fa-users mr-3 group-hover:text-indigo-400 transition-colors"></i>
            <span className="text-sm font-medium">Usuarios</span>
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group">
            <i className="fas fa-chart-pie mr-3 group-hover:text-indigo-400 transition-colors"></i>
            <span className="text-sm font-medium">Reportes</span>
          </a>
        </nav>

        {/* Sección Inferior de Usuario */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center p-3 mb-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-inner">
              {usuario?.nombre?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{usuario?.nombre}</p>
              <p className="text-[10px] text-slate-500 font-medium">Administrador</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300 group border border-transparent hover:border-red-500/20"
          >
            <i className="fas fa-sign-out-alt mr-3 group-hover:-translate-x-1 transition-transform"></i>
            Cerrar Sesión
          </button>
        </div>
      </aside>
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER SUPERIOR */}
        {/* <header className="bg-white shadow-sm p-4 flex justify-between items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">Gestión de Inventario</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bienvenido, <strong className="text-indigo-600">{usuario?.nombre}</strong></span>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              {usuario?.nombre?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header> */}

        {/* ÁREA DE TRABAJO SCROLLABLE */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-8">

          {/* TARJETAS DE ESTADÍSTICAS RÁPIDAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Tarjeta Productos */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <i className="fas fa-database fa-4xl text-blue-600"></i>
              </div>
              <div className="flex items-center relative z-10">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg shadow-blue-100 mr-4">
                  <i className="fas fa-box-open fa-lg"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Productos</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-black text-gray-800">{productos.length}</h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta Ventas */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <i className="fas fa-chart-line fa-4xl text-green-600"></i>
              </div>
              <div className="flex items-center relative z-10">
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg shadow-green-100 mr-4">
                  <i className="fas fa-wallet fa-lg"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ventas Del Mes <span className='text-white bg-black p-[2px] borde rounded-full'>1/05/2026</span></p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-black text-gray-800">$523.58</h3>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta Sin Stock */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <i className="fas fa-exclamation-circle fa-4xl text-red-600"></i>
              </div>
              <div className="flex items-center relative z-10">
                <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white shadow-lg shadow-red-100 mr-4">
                  <i className="fas fa-dolly fa-lg"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sin Stock</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-black text-gray-800">0</h3>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Alerta</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* FORMULARIO DE AGREGAR PRODUCTO */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Encabezado del Formulario */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
                  <h2 className="text-white text-lg font-bold flex items-center">
                    <i className="fas fa-plus-circle mr-2"></i> Nuevo Producto
                  </h2>
                  <p className="text-indigo-100 text-xs mt-1">Completa los campos para actualizar el stock.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Input Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre del Producto</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i className="fas fa-tag"></i>
                      </span>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                        placeholder="Ej: Monitor Gamer 4K"
                      />
                    </div>
                  </div>

                  {/* Input Precio */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Precio de Venta ($)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i className="fas fa-dollar-sign"></i>
                      </span>
                      <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Input Descripción */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción Detallada</label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm h-28 resize-none"
                      placeholder="Escribe las características principales..."
                    ></textarea>
                  </div>

                  {/* Input Imagen */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">URL de la Imagen</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i className="fas fa-image"></i>
                      </span>
                      <input
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                        placeholder="http://example.com/imagen.jpg"
                      />
                    </div>
                  </div>

                  {/* Botón Guardar */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-save"></i>
                    <span>Guardar en Inventario</span>
                  </button>
                </form>
              </div>
            </div>
            {/* TABLA DE PRODUCTOS */}
            {/* TABLA DE PRODUCTOS */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

                {/* CABECERA CON BUSCADOR */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Productos en Inventario</h2>
                      <p className="text-xs text-gray-500">Gestiona y filtra los productos de tu tienda</p>
                    </div>

                    {/* INPUT DE BÚSQUEDA */}
                    <div className="relative w-full md:w-64">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i className="fas fa-search"></i>
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                        placeholder="Buscar por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                      />
                    </div>

                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition flex items-center">
                      <i className="fas fa-sync-alt mr-2"></i> Refrescar
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">Info</th>
                        <th className="px-6 py-4 font-medium">Nombre</th>
                        <th className="px-6 py-4 font-medium">Precio</th>
                        <th className="px-6 py-4 font-medium text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productosFiltrados.map((producto) => (
                        <tr key={producto.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                #{producto.id}
                              </span>
                              <div className="w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm group-hover:border-indigo-200 transition-colors">
                                <img
                                  src={producto.imagen}
                                  alt={producto.nombre}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-700">{producto.nombre}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-sm font-bold border border-green-100">
                              <span className="text-xs mr-1 opacity-70">$</span>
                              {producto.precio}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center items-center space-x-2">
                              {/* Botón Editar */}
                              <button
                                className="w-10 h-10 flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 shadow-sm shadow-blue-100 group/edit"
                                title="Editar producto"
                              >
                                <span className="group-hover/edit:scale-110 transition-transform">
                                  📝 <i className="fas fa-pen text-[10px] ml-1 hidden"></i>
                                </span>
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                className="w-10 h-10 flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 shadow-sm shadow-red-100 group/delete"
                                title="Eliminar producto"
                              >
                                <span className="group-hover/delete:scale-110 transition-transform">
                                  🗑️ <i className="fas fa-trash-alt text-[10px] ml-1 hidden"></i>
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;