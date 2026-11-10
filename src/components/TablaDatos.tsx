import { Table, Button, Spinner } from "react-bootstrap";
import type { Columna } from "../types/formulario";
import type { Entidad } from "../types/modelos";

interface TablaDatosProps<TFila extends Entidad> {
  columnas: Columna<TFila>[];
  filas: TFila[];
  cargando: boolean;
  onEditar: (fila: TFila) => void;
  onEliminar: (fila: TFila) => void;
}

// Tabla genérica: sirve para productos, proveedores o clientes.
// <TFila> es el tipo de cada fila, y TypeScript lo deduce solo de las props que recibe.
export default function TablaDatos<TFila extends Entidad>({
  columnas,
  filas,
  cargando,
  onEditar,
  onEliminar,
}: TablaDatosProps<TFila>) {
  if (cargando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="tabla-datos align-middle mb-0">
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c.clave}>{c.titulo}</th>
            ))}
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 && (
            <tr>
              <td colSpan={columnas.length + 1} className="text-center text-muted py-4">
                Aún no hay registros. Usa el botón de crear para agregar el primero.
              </td>
            </tr>
          )}
          {filas.map((fila) => (
            <tr key={fila.id}>
              {columnas.map((c) => (
                <td key={c.clave}>{c.mostrar ? c.mostrar(fila) : String(fila[c.clave] ?? "")}</td>
              ))}
              <td className="text-end text-nowrap">
                <Button size="sm" variant="outline-success" className="me-2" onClick={() => onEditar(fila)}>
                  Actualizar
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onEliminar(fila)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
