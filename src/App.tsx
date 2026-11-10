import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import InicioPage from "./pages/InicioPage";
import ProductosPage from "./pages/ProductosPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import ClientesPage from "./pages/ClientesPage";

// Aquí se definen las "páginas" de la app. Layout dibuja el menú lateral
// y, en el centro, la página que corresponda a la dirección (URL) actual.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InicioPage />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="proveedores" element={<ProveedoresPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
