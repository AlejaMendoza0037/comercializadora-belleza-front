import { useCallback, useEffect, useState } from "react";
import type { CrudService } from "../services/CrudService";
import type { DatosFormulario } from "../types/formulario";
import type { Entidad } from "../types/modelos";

export interface ResultadoCrud<
  TEntidad extends Entidad,
  TForm extends DatosFormulario,
> {
  items: TEntidad[];
  termino: string;
  setTermino: (texto: string) => void;
  pagina: number;
  totalPaginas: number;
  setPagina: (n: number) => void;
  cargando: boolean;
  error: string | null;
  guardar: (datos: TForm, id?: number) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
}

export default function useCrud<
  TEntidad extends Entidad,
  TForm extends DatosFormulario,
>(servicio: CrudService<TEntidad, TForm>): ResultadoCrud<TEntidad, TForm> {
  const [items, setItems] = useState<TEntidad[]>([]);
  const [termino, setTerminoInterno] = useState<string>("");
  const [pagina, setPagina] = useState<number>(0);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Al escribir en el buscador se vuelve a la primera página.
  function setTermino(texto: string): void {
    setPagina(0);
    setTerminoInterno(texto);
  }

  const cargar = useCallback(async (): Promise<void> => {
    setCargando(true);
    try {
      const r = await servicio.listarPagina(termino, pagina);
      // Si se borró el último producto de una página, retrocede una.
      if (r.items.length === 0 && pagina > 0) {
        setPagina(pagina - 1);
        return;
      }
      setItems(r.items);
      setTotalPaginas(r.totalPaginas);
      setError(null);
    } catch {
      setError(
        "No se pudo conectar con el servidor. Revisa que el backend esté encendido.",
      );
    } finally {
      setCargando(false);
    }
  }, [servicio, termino, pagina]);

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

  return {
    items,
    termino,
    setTermino,
    pagina,
    totalPaginas,
    setPagina,
    cargando,
    error,
    guardar,
    eliminar,
  };
}
