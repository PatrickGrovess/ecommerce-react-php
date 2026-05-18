import { createContext, useState, useEffect } from "react"; // Quita el 'use' del final

// 1. Esto crea la "vía de comunicación"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            try {
                setUsuario(JSON.parse(usuarioGuardado));
            } catch (e) {
                console.error("Error al leer el usuario del localStorage", e);
            }
        }
        setCargando(false);
    }, []);

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    }

    // 2. Aquí es donde sucede la magia: pasamos los datos a través del 'value'
    return (
        <AuthContext.Provider value={{ usuario, setUsuario, logout, cargando}}>
            {children}
        </AuthContext.Provider>
    )
}