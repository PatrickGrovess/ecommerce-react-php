// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react"; // 1. Importa el hook
import { AuthContext } from "./Context/AuthContext"; // 2. Importa TU contextoimport Registro from './Pages/Registro';
import Registro from './Pages/Registro';
import Tienda from './Pages/Tienda';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import Configuracion from "./Pages/Configuracion";
function App() {

  const { usuario, cargando } = useContext(AuthContext)

  if (cargando) return <div>Cargando sesión...</div>;

  return (
    <Routes> {/* Solo dejas las rutas, el Router ya viene del 'padre' */}
      <Route path="/" element={<Tienda />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/configuracion" element={<Configuracion />} />
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}

      <Route
        path="/admin"
        element={
          usuario?.rol === 'admin'
            ? <AdminDashboard />
            : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;