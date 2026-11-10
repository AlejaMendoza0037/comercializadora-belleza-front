import { useCallback, useEffect, useState } from "react";
import type { CrudService } from "../services/CrudService";
import type { DatosFormulario } from "../types/formulario";
import type { Entidad } from "../types/modelos";

// Lo que el hook entrega a quien lo use.
export interface ResultadoCrud<TEntidad extends Entidad, TForm extends DatosFormulario> {
  items: TEntidad[];
  termino: string;
  setTermino: (texto: string) => void;
  cargando: boolean;
  error: string | null;
  guardar: (datos: TForm, id?: number) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
}

// Hook reutilizable: guarda la lista, el texto de búsqueda y el estado de carga,
// y ofrece guardar/eliminar para cualquier servicio CRUD.
export default function useCrud<TEntidad extends Entidad, TForm extends DatosFormulario>(
  servicio: CrudService<TEntidad, TForm>
): ResultadoCrud<TEntidad, TForm> {
  const [items, setItems] = useState<TEntidad[]>([]);
  const [termino, setTermino] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async (): Promise<void> => {
    setCargando(true);
    try {
      setItems(await servicio.listar(termino));
      setError(null);
    } catch {
      setError("No se pudo conectar con el servidor. Revisa que el backend esté encendido.");
    } finally {
      setCargando(false);
    }
  }, [servicio, termino]);

  // Espera 300 ms después de la última tecla para no llamar al backend en cada letra.
  useEffect(() => {
    const espera = setTimeout(cargar, 300);
    return () => clearTimeout(espera);
  }, [cargar]);

  async function guardar(datos: TForm, id?: number): Promise<void> {
    if (id !== undefined) await servicio.actualizar(id, datos);
    else await servicio.crear(datos);
    await cargar();
  }

  async function eliminar(id: number): Promise<void> {
    await servicio.eliminar(id);
    await cargar();
  }

  return { items, termino, setTermino, cargando, error, guardar, eliminar };
}
