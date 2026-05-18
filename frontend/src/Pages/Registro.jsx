import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importante para la redirección
import Login from "./Login";

const Registro = () => {
  // Estados para los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const datosUsuario = { nombre, email, password };

    try {
      const respuesta = await fetch('http://localhost:3001/api/registro', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
      });
      const resultado = await respuesta.json();

      if (resultado.message) {
        alert("¡Éxito!: " + resultado.message);
      } else {
        alert("Error: " + resultado.error);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      
      {/* Botón Volver al Inicio (Arriba a la izquierda) */}
      <div className="absolute top-6 left-6">
        <Link 
          to="/" // Ruta de inicio
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          {/* Icono de Flecha (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver al Inicio
        </Link>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Crear Cuenta</h2>
        <p className="text-gray-600 text-center mb-8">
          Regístrate para empezar a comprar en <span className="font-semibold text-[#3B82F6]">SamsFlow</span>.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Campo Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">Nombre Completo</label>
            <input 
              type="text" 
              placeholder="Ej: Pedro Pérez" 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#3B82F6] transition"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* Campo Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#3B82F6] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">Contraseña</label>
            <input 
              type="password" 
              placeholder="Mínimo 6 caracteres" 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#3B82F6] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* Botón Registrarme con color naranja */}
          <button 
            type="submit" 
            className="bg-[#3B82F6] text-white font-bold py-3.5 rounded-lg hover:bg-orange-500 transition-colors shadow-md shadow-orange-100 mt-2"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
          ¿Ya tienes cuenta? <Link to="/login" className="text-[#3B82F6] font-semibold hover:underline">Inicia Sesión aquí</Link>
        </div>
      </div>
    </main>
  );
};

export default Registro;