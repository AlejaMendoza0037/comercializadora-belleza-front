import type { RespuestaLista } from "../types/api";
import type { DatosFormulario } from "../types/formulario";
import type { Entidad } from "../types/modelos";
import { apiClient, type ApiClient } from "./ApiClient";

// Clase base genérica con las 4 operaciones del CRUD.
//   TEntidad = lo que devuelve el backend (Producto, Cliente...)
//   TForm    = lo que se envía al crear o actualizar
// Las clases hijas (ProductoService, etc.) la heredan con "extends".
export class CrudService<
  TEntidad extends Entidad,
  TForm extends DatosFormulario,
> {
  private readonly ruta: string;
  private readonly cliente: ApiClient;

  constructor(ruta: string, cliente: ApiClient = apiClient) {
    this.ruta = ruta;
    this.cliente = cliente;
  }

  // Gancho: las clases hijas pueden sobrescribirlo para ajustar cada registro recibido.
  protected transformar(registro: TEntidad): TEntidad {
    return registro;
  }

  async listar(termino: string = ""): Promise<TEntidad[]> {
    const url = termino
      ? `${this.ruta}/search?name=${encodeURIComponent(termino)}`
      : this.ruta;
    const datos = await this.cliente.peticion<RespuestaLista<TEntidad> | null>(
      url,
    );
    const lista = Array.isArray(datos) ? datos : (datos?.content ?? []);
    return lista.map((registro) => this.transformar(registro));
  }

  // Lista por páginas (de 10 en 10). Con búsqueda no se pagina.
  async listarPagina(
    termino: string = "",
    pagina: number = 0,
  ): Promise<{ items: TEntidad[]; totalPaginas: number }> {
    if (termino) {
      const items = await this.listar(termino);
      return { items, totalPaginas: 1 };
    }
    const datos = await this.cliente.peticion<
      //{ content?: TEntidad[]; totalPages?: number } | TEntidad[] | null
      | {
          content?: TEntidad[];
          totalPages?: number;
          page?: { totalPages?: number };
        }
      | TEntidad[]
      | null
    >(`${this.ruta}?page=${pagina}`);
    if (Array.isArray(datos)) {
      return { items: datos.map((r) => this.transformar(r)), totalPaginas: 1 };
    }
    return {
      items: (datos?.content ?? []).map((r) => this.transformar(r)),
      //totalPaginas: datos?.totalPages ?? 1,
      totalPaginas: datos?.page?.totalPages ?? datos?.totalPages ?? 1,
    };
  }

  crear(datos: TForm): Promise<TEntidad> {
    return this.cliente.peticion<TEntidad>(this.ruta, {
      method: "POST",
      body: JSON.stringify(datos),
    });
  }

  // El backend espera el id dentro del cuerpo en el PUT.
  actualizar(id: number, datos: TForm): Promise<TEntidad> {
    return this.cliente.peticion<TEntidad>(this.ruta, {
      method: "PUT",
      body: JSON.stringify({ id, ...datos }),
    });
  }

  eliminar(id: number): Promise<void> {
    return this.cliente.peticion<void>(`${this.ruta}/${id}`, {
      method: "DELETE",
    });
  }
}
