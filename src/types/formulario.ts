import type { ReactNode } from "react";

// Datos que se envían al backend: texto o número por cada campo.
export type DatosFormulario = Record<string, string | number>;

export type TipoCampo = "text" | "number" | "email" | "select";

// Describe un campo del formulario. "nombre" solo puede ser una clave real de TForm:
// si escribes un nombre que no existe, TypeScript marca el error.
export interface CampoFormulario<TForm> {
  nombre: Extract<keyof TForm, string>;
  etiqueta: string;
  tipo: TipoCampo;
  opciones?: string[];
}

// Lo que la persona escribe en el formulario siempre es texto.
export type ValoresFormulario<TForm> = Record<Extract<keyof TForm, string>, string>;

// Describe una columna de la tabla. "clave" solo puede ser una propiedad real de la fila.
export interface Columna<TFila> {
  clave: Extract<keyof TFila, string>;
  titulo: string;
  mostrar?: (fila: TFila) => ReactNode;
}
