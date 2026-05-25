import { use, useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
// import imagenReferencia from "./assets/imgProductos/imgReferencia.jpg"
import { Link } from "react-router-dom"
import Registro from './Registro';
import configuracion from './Configuracion';


function Tienda() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const { usuario, logout } = useContext(AuthContext);
    const [abierto, setAbierto] = useState(false);
    // 2. Filtramos el array de productos original basado en el texto de búsqueda
    const productosFiltrados = productos.filter((producto) => {
        // Convertimos todo a minúsculas para que la búsqueda no sea estricta con las mayúsculas
        const nombreProducto = producto.nombre.toLowerCase();
        const terminoBusqueda = busqueda.toLowerCase();

        // Si el nombre del producto incluye lo que escribimos, se queda en la lista
        return nombreProducto.includes(terminoBusqueda);
    });

    const obtenerDatos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3001/api/prueba');

            // Convertimos el String que manda PHP a un Objeto JS que entiende React
            const resultado = await respuesta.json();

            setProductos(resultado);
            setCargando(false);
        }
        catch (error) {
            console.error('Error al obtener los productos:', error);
            setCargando(false);
        }
    }

    function toggleMenu() {
        setAbierto(!abierto);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);



    return (
        <>
            <div className='bg-black text-center text-white'>
                <h2 className='font-bold text-[13px]'>Envío gratis a todo Panamá a partir de 100$ en productos</h2>
            </div>

            <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-8">

                    {/* 1. LOGO */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl md:text-2xl font-black italic">PTH</span>
                        </div>
                        <h1 className="text-lg md:text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
                            Punto<span className="text-[#3B82F6]">Tech</span>
                        </h1>
                    </div>

                    {/* 2. BUSCADOR */}
                    <nav className="flex-1 min-w-[120px]">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center">
                                <svg className="h-4 w-4 md:h-5 md:w-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full pl-9 md:pl-12 pr-2 md:pr-4 py-2 border border-[#3B82F6] rounded-full outline-none text-xs md:text-sm text-gray-400 placeholder-gray-400"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </nav>

                    {/* 3. ACCIONES */}
                    <div className="flex items-center gap-2 md:gap-6 shrink-0">

                        <div className="hidden lg:flex items-center gap-6">
                            {/* LÓGICA DINÁMICA: Si hay usuario muestra su nombre, si no, muestra Iniciar Sesión */}
                            {usuario ? (
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] text-[#3B82F6] font-bold uppercase leading-none">Bienvenido</p>
                                        <p className="text-sm font-black text-gray-800 uppercase">{usuario.nombre}</p>

                                        <div onClick={toggleMenu} className="relative cursor-pointer">
                                            <img width={13} src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="" />
                                            {abierto ? (
                                                <Link to="/configuracion">
                                                    <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48'>
                                                        <button
                                                            className="w-full text-left text-[10px] bg-gray-100 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded transition-colors font-bold uppercase"
                                                        >
                                                            configuración
                                                        </button>
                                                        <button
                                                            onClick={logout}
                                                            className="w-full text-left text-[10px] bg-gray-100 hover:bg-red-100 hover:text-red-600 px-2 py-1 rounded transition-colors font-bold uppercase"
                                                        >
                                                            Salir
                                                        </button>
                                                    </div>
                                                </Link>
                                            ) : null
                                            }
                                        </div>
                                    </div>
                                    {/* <button
                                        onClick={logout}
                                        className="text-[10px] bg-gray-100 hover:bg-red-100 hover:text-red-600 px-2 py-1 rounded transition-colors font-bold uppercase"
                                    >
                                        Salir
                                    </button> */}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Inicia</p>
                                    <p className="text-sm font-black text-gray-800">Sesión</p>
                                </Link>
                            )}

                            {usuario?.rol === 'admin' && (
                                <Link to="/admin">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Panel</p>
                                    <p className="text-sm font-black text-gray-800">Admin</p>
                                </Link>
                            )}

                            <div className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {/* Podrías poner un badge de carrito aquí luego */}
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* 4. "Pintamos" los productos en la pantalla */}
            <main className="max-w-[1000px] mx-auto px-10 py-12">
                {/* Título de la sección opcional */}
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-slate-800">Novedades en PuntoTech</h2>
                    <div className="w-20 h-1.5 bg-[#3B82F6] mt-2 rounded-full"></div>
                </div>

                {/* El Grid de 3 columnas (1 en móvil, 3 en escritorio) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {productosFiltrados.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
                        >
                            {/* Contenedor de Imagen */}
                            <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                                <img
                                    src={producto.imagen}
                                    // src={imagenReferencia}
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Información del Producto */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {producto.nombre}
                                </h3>

                                <p className="text-1xl font-black text-green-500 mb-3">
                                    ${producto.precio}
                                </p>

                                <p className="text-1xl font-black text-gray-600 mb-3">
                                    Cantidad: <select className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </p>

                                {/* Botones */}
                                {/* <div className="mt-auto space-y-3">
                  <button className="w-full bg-[#3B82F6] hover:bg-orange-700 text-white font-bold py-3 rounded-2xl transition-colors active:scale-[0.98] cursor-pointer">
                    Comprar ahora
                  </button> */}
                                <button className="w-full bg-inherit hover:bg-gray-200 text-black font-bold py-3 rounded-none border border-[#3B82F6] transition-colors cursor-pointer">
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                        // </div>
                    ))}
                </div>
            </main>



            <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                        {/* Columna 1: Branding y Ubicación */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#0f172b] rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xl font-black italic">S</span>
                                </div>
                                <span className="text-xl font-black text-gray-900 tracking-tight">h<span className="text-[#3B82F6]">Flow</span></span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Tu destino tecnológico favorito en Panamá. Calidad, garantía y rapidez en cada entrega.
                            </p>
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <svg className="h-5 w-5 text-[#3B82F6] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Ciudad de Panamá, Vía España, Edificio TechHub, Local 12.</span>
                            </div>
                        </div>

                        {/* Columna 2: Navegación */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6">Compra con Nosotros</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Nuevos Productos</a></li>
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Ofertas de la Semana</a></li>
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Categorías</a></li>
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Preguntas Frecuentes</a></li>
                            </ul>
                        </div>

                        {/* Columna 3: Soporte y Contacto */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6">Atención al Cliente</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+507 0000-0000</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 012 2H3a2 2 0 012-2zm0-10V7a2 2 0 012-2h10a2 2 0 012 2v2" />
                                    </svg>
                                    <span>soporte@PuntoTech.com</span>
                                </li>
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Políticas de Envío</a></li>
                                <li><a href="#" className="hover:text-[#3B82F6] transition-colors">Términos y Condiciones</a></li>
                            </ul>
                        </div>

                        {/* Columna 4: Redes Sociales y Pagos */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6">Síguenos</h4>
                            <div className="flex gap-4 mb-8">
                                <a href="#" className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#3B82F6] hover:border-orange-200 transition-all">
                                    <i className="fab fa-facebook-f"></i> {/* Asumiendo que usas FontAwesome o iconos similares */}
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-200 transition-all">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#3B82F6] hover:border-orange-100 transition-all">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-4 text-sm">Métodos de Pago</h4>
                            <div className="flex flex-wrap gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Línea Final */}
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-medium uppercase tracking-widest">
                        <p>© 2026 h PANAMÁ. TODOS LOS DERECHOS RESERVADOS.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-gray-900 transition-colors">Privacidad</a>
                            <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Tienda;