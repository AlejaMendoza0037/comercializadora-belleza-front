import PaginaCrud from "../components/PaginaCrud";
import { clienteService } from "../services/ClienteService";
import type { CampoFormulario, Columna } from "../types/formulario";
import type { Cliente, ClienteForm } from "../types/modelos";

const COLUMNAS: Columna<Cliente>[] = [
  { clave: "id", titulo: "Id" },
  { clave: "nombre", titulo: "Nombre" },
  { clave: "documento", titulo: "Documento" },
  { clave: "telefono", titulo: "Teléfono" },
  { clave: "correo", titulo: "Correo" },
];

const CAMPOS: CampoFormulario<ClienteForm>[] = [
  { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
  { nombre: "documento", etiqueta: "Documento", tipo: "text" },
  { nombre: "telefono", etiqueta: "Teléfono", tipo: "text" },
  { nombre: "correo", etiqueta: "Correo", tipo: "email" },
];

export default function ClientesPage() {
  return (
    <PaginaCrud
      titulo="Clientes"
      singular="cliente"
      servicio={clienteService}
      columnas={COLUMNAS}
      campos={CAMPOS}
      placeholderBusqueda="Buscar cliente por nombre"
    />
  );
}
