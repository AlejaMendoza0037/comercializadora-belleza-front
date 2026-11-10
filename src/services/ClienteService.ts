import type { Cliente, ClienteForm } from "../types/modelos";
import { CrudService } from "./CrudService";

export class ClienteService extends CrudService<Cliente, ClienteForm> {
  constructor() {
    super("/client");
  }
}

export const clienteService = new ClienteService();
