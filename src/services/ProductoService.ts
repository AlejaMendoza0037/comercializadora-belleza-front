import type { Producto, ProductoForm } from "../types/modelos";
import { CrudService } from "./CrudService";

// Hereda listar, crear, actualizar y eliminar de CrudService.
export class ProductoService extends CrudService<Producto, ProductoForm> {
  constructor() {
    super("/product");
  }

  // El backend a veces manda "categoria" y a veces "categoriaNombre":
  // aquí se unifican para que el resto de la app no tenga que preocuparse.
  protected override transformar(producto: Producto): Producto {
    const categoria = producto.categoria ?? producto.categoriaNombre;
    return { ...producto, categoria, categoriaNombre: categoria };
  }
}

export const productoService = new ProductoService();
