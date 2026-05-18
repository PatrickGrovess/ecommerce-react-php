import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redireccionar después del login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const resultado = await respuesta.json();

      if (resultado.usuario) {
        alert(`¡Bienvenido de nuevo, ${resultado.usuario.nombre}!`);
        
        // Guardar la sesión
        console.log("Datos del usuario:", resultado.usuario);
        
        localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
        // Redirigir a la tienda
        navigate('/'); 
      } else {
        alert("Error: " + resultado.error);
      }
    } catch (error) {
      console.error("Error al conectar:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      
      {/* Botón Volver */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver a la Tienda
        </Link>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Iniciar Sesión</h2>
        <p className="text-gray-600 text-center mb-8">
          Ingresa tus credenciales para acceder a <span className="font-semibold text-[#3B82F6]">E-Commer</span>.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#3B82F6] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-gray-700 text-sm">Contraseña</label>
            <input 
              type="password" 
              placeholder="Tu contraseña" 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#3B82F6] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-[#3B82F6] text-white font-bold py-3.5 rounded-lg hover:bg-orange-500 transition-colors shadow-md shadow-orange-100 mt-2"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
          ¿No tienes una cuenta? <Link to="/registro" className="text-[#3B82F6] font-semibold hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;