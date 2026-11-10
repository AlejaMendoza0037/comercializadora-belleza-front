import type { Categoria, CategoriaForm } from "../types/modelos";
import { CrudService } from "./CrudService";

export class CategoriaService extends CrudService<Categoria, CategoriaForm> {
  constructor() {
    super("/category");
  }
}

export const categoriaService = new CategoriaService();
