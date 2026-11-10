import { API_URL } from "../config/api";

// Error propio: además del mensaje guarda el código HTTP (404, 500...).
export class ApiError extends Error {
  readonly estado: number;

  constructor(mensaje: string, estado: number) {
    super(mensaje);
    this.name = "ApiError";
    this.estado = estado;
  }
}

// Clase que envuelve fetch: agrega el encabezado JSON, lanza ApiError si el servidor
// responde mal y tolera respuestas vacías (como las de DELETE).
export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // <T> es un tipo genérico: quien llama dice qué forma espera la respuesta.
  async peticion<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    const respuesta = await fetch(`${this.baseUrl}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
    if (!respuesta.ok) {
      throw new ApiError(`Error ${respuesta.status} en ${ruta}`, respuesta.status);
    }
    const texto = await respuesta.text();
    return (texto ? JSON.parse(texto) : undefined) as T;
  }
}

// Una sola instancia compartida por todos los servicios.
export const apiClient = new ApiClient(API_URL);
