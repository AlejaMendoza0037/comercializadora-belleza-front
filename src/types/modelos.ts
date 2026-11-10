// "Modelos": describen la forma de los datos que vienen del backend (Spring Boot).
// Una interface es un contrato: TypeScript avisa si falta un campo o tiene el tipo equivocado.

export interface Entidad {
  id: number;
}

export interface Producto extends Entidad {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria?: string; // el "?" significa que puede no venir
  categoriaNombre?: string;
}

export interface Categoria extends Entidad {
  nombre: string;
}

// OJO: los campos de Proveedor y Cliente son una suposición.
// Deben coincidir con las entidades Supplier y Client del backend.
export interface Proveedor extends Entidad {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface Cliente extends Entidad {
  nombre: string;
  documento: string;
  telefono: string;
  correo: string;
}

// Datos que se ENVÍAN al crear o actualizar: son el modelo sin el id.
// Pick y Omit son "tipos utilitarios": derivan un tipo nuevo a partir de otro.
export type ProductoForm = Pick<Producto, "nombre" | "descripcion" | "precio" | "stock"> & {
  categoriaNombre: string;
};
export type CategoriaForm = Pick<Categoria, "nombre">;
export type ProveedorForm = Omit<Proveedor, "id">;
export type ClienteForm = Omit<Cliente, "id">;
