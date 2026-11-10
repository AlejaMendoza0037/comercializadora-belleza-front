import PaginaCrud from "../components/PaginaCrud";
import { proveedorService } from "../services/ProveedorService";
import type { CampoFormulario, Columna } from "../types/formulario";
import type { Proveedor, ProveedorForm } from "../types/modelos";

const COLUMNAS: Columna<Proveedor>[] = [
  { clave: "id", titulo: "Id" },
  { clave: "nombre", titulo: "Nombre" },
  { clave: "telefono", titulo: "Teléfono" },
  { clave: "correo", titulo: "Correo" },
  { clave: "direccion", titulo: "Dirección" },
];

const CAMPOS: CampoFormulario<ProveedorForm>[] = [
  { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
  { nombre: "telefono", etiqueta: "Teléfono", tipo: "text" },
  { nombre: "correo", etiqueta: "Correo", tipo: "email" },
  { nombre: "direccion", etiqueta: "Dirección", tipo: "text" },
];

export default function ProveedoresPage() {
  return (
    <PaginaCrud
      titulo="Proveedores"
      singular="proveedor"
      servicio={proveedorService}
      columnas={COLUMNAS}
      campos={CAMPOS}
      placeholderBusqueda="Buscar proveedor por nombre"
    />
  );
}
