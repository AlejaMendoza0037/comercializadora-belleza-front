import { useEffect, useMemo, useState } from "react";
import PaginaCrud from "../components/PaginaCrud";
import { CATEGORIAS_BASE } from "../config/negocio";
import { categoriaService } from "../services/CategoriaService";
import { productoService } from "../services/ProductoService";
import type { CampoFormulario, Columna } from "../types/formulario";
import type { Producto, ProductoForm } from "../types/modelos";

// Si escribes una clave que no existe en Producto, TypeScript marca el error aquí mismo.
const COLUMNAS: Columna<Producto>[] = [
  { clave: "id", titulo: "Id" },
  { clave: "nombre", titulo: "Nombre" },
  { clave: "descripcion", titulo: "Descripción" },
  { clave: "precio", titulo: "Precio", mostrar: (p) => `$${Number(p.precio).toLocaleString("es-CO")}` },
  { clave: "stock", titulo: "Stock" },
  { clave: "categoria", titulo: "Categoría", mostrar: (p) => p.categoria ?? "Sin categoría" },
];

export default function ProductosPage() {
  const [categorias, setCategorias] = useState<string[]>(CATEGORIAS_BASE);

  // Las categorías salen de la base de datos; si falla, se usan las de respaldo.
  useEffect(() => {
    categoriaService
      .listar()
      .then((lista) => {
        const nombres = lista.map((c) => c.nombre).filter(Boolean);
        if (nombres.length > 0) setCategorias(nombres);
      })
      .catch(() => {});
  }, []);

  const campos = useMemo<CampoFormulario<ProductoForm>[]>(
    () => [
      { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
      { nombre: "descripcion", etiqueta: "Descripción", tipo: "text" },
      { nombre: "precio", etiqueta: "Precio", tipo: "number" },
      { nombre: "stock", etiqueta: "Stock", tipo: "number" },
      { nombre: "categoriaNombre", etiqueta: "Categoría", tipo: "select", opciones: categorias },
    ],
    [categorias]
  );

  return (
    <PaginaCrud
      titulo="Productos"
      singular="producto"
      servicio={productoService}
      columnas={COLUMNAS}
      campos={campos}
      placeholderBusqueda="Buscar producto por nombre"
    />
  );
}
