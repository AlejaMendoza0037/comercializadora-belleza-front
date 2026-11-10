import { useMemo, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import useCrud from "../hooks/useCrud";
import type { CrudService } from "../services/CrudService";
import type { CampoFormulario, Columna, DatosFormulario, ValoresFormulario } from "../types/formulario";
import type { Entidad } from "../types/modelos";
import Buscador from "./Buscador";
import ModalFormulario from "./ModalFormulario";
import TablaDatos from "./TablaDatos";

interface PaginaCrudProps<TEntidad extends Entidad, TForm extends DatosFormulario> {
  titulo: string;
  singular: string;
  servicio: CrudService<TEntidad, TForm>;
  columnas: Columna<TEntidad>[];
  campos: CampoFormulario<TForm>[];
  placeholderBusqueda: string;
}

// Pantalla completa de administración (buscar, listar, crear, actualizar, eliminar).
// Productos, proveedores y clientes la reutilizan: solo cambian los datos que reciben.
export default function PaginaCrud<TEntidad extends Entidad, TForm extends DatosFormulario>({
  titulo,
  singular,
  servicio,
  columnas,
  campos,
  placeholderBusqueda,
}: PaginaCrudProps<TEntidad, TForm>) {
  const { items, termino, setTermino, cargando, error, guardar, eliminar } = useCrud(servicio);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editando, setEditando] = useState<TEntidad | null>(null); // null = creando uno nuevo
  const [aviso, setAviso] = useState<string>("");

  // Valores con los que arranca el formulario: vacíos al crear, los del registro al actualizar.
  const valoresIniciales = useMemo<ValoresFormulario<TForm>>(() => {
    const valores = {} as ValoresFormulario<TForm>;
    campos.forEach((c) => {
      const crudo: unknown = editando ? Reflect.get(editando, c.nombre) : "";
      valores[c.nombre] = crudo == null ? "" : String(crudo);
    });
    return valores;
  }, [editando, campos]);

  function abrirCrear(): void {
    setEditando(null);
    setModalVisible(true);
  }

  function abrirEditar(fila: TEntidad): void {
    setEditando(fila);
    setModalVisible(true);
  }

  async function pedirEliminar(fila: TEntidad): Promise<void> {
    if (!window.confirm(`¿Seguro que quieres eliminar este ${singular}?`)) return;
    try {
      await eliminar(fila.id);
    } catch {
      setAviso(`No se pudo eliminar el ${singular}. Puede estar asociado a otros registros.`);
    }
  }

  return (
    <section>
      <header className="pagina-encabezado">
        <h1>{titulo}</h1>
        <Button onClick={abrirCrear}>Crear {singular}</Button>
      </header>

      <Buscador valor={termino} onCambio={setTermino} placeholder={placeholderBusqueda} />

      {error && <Alert variant="warning" className="mt-3">{error}</Alert>}
      {aviso && (
        <Alert variant="danger" dismissible onClose={() => setAviso("")} className="mt-3">
          {aviso}
        </Alert>
      )}

      <div className="panel mt-3">
        <TablaDatos
          columnas={columnas}
          filas={items}
          cargando={cargando}
          onEditar={abrirEditar}
          onEliminar={pedirEliminar}
        />
      </div>

      <ModalFormulario
        visible={modalVisible}
        titulo={editando ? `Actualizar ${singular}` : `Crear ${singular}`}
        campos={campos}
        valoresIniciales={valoresIniciales}
        onGuardar={(datos) => guardar(datos, editando?.id)}
        onCerrar={() => setModalVisible(false)}
      />
    </section>
  );
}
