// El backend responde con una lista simple o paginada ({ content: [...] }).
export interface RespuestaPaginada<T> {
  content: T[];
}

export type RespuestaLista<T> = T[] | RespuestaPaginada<T>;
