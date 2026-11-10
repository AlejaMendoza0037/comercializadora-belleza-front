// Forma que debe tener la información del negocio.
interface Negocio {
  nombre: string;
  descripcion: string;
  anio: number;
}

// Datos del negocio en un solo lugar: si cambia el nombre, se cambia aquí.
export const NEGOCIO: Negocio = {
  nombre: "Emiliz",
  descripcion: "Comercializadora de Belleza",
  anio: 2026,
};

// Categorías de respaldo si el backend aún no responde en /category.
// Deben escribirse igual que en la base de datos.
export const CATEGORIAS_BASE: string[] = [
  "SHAMPOO_Y_TRATAMIENTOS",
  "TINTES",
  "ESMALTES",
  "EQUIPOS_ELECTRICOS",
  "ACCESORIOS",
  "OTROS",
];
