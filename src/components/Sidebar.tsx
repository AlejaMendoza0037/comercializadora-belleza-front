import { NavLink } from "react-router-dom";
import { NEGOCIO } from "../config/negocio";

interface Enlace {
  ruta: string;
  texto: string;
}

const ENLACES: Enlace[] = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/productos", texto: "Productos" },
  //{ ruta: "/proveedores", texto: "Proveedores" },
  // { ruta: "/clientes", texto: "Clientes" },
];

// Menú lateral. NavLink marca solo el enlace de la página actual con la clase "active".
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-marca">
        <span className="sidebar-logo">{NEGOCIO.nombre[0]}</span>
        <div>
          <strong>{NEGOCIO.nombre}</strong>
          <small>{NEGOCIO.descripcion}</small>
        </div>
      </div>
      <nav className="sidebar-menu">
        {ENLACES.map(({ ruta, texto }) => (
          <NavLink
            key={ruta}
            to={ruta}
            end={ruta === "/"}
            className="sidebar-enlace"
          >
            {texto}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
