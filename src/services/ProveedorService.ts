import type { Proveedor, ProveedorForm } from "../types/modelos";
import { CrudService } from "./CrudService";

export class ProveedorService extends CrudService<Proveedor, ProveedorForm> {
  constructor() {
    super("/supplier");
  }
}

export const proveedorService = new ProveedorService();
