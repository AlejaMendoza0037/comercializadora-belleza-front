import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// Estructura común a todas las páginas: menú a la izquierda y contenido a la derecha.
// <Outlet /> es el hueco donde React Router pone la página activa.
export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
}
