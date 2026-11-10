import { Link } from "react-router-dom";
import { NEGOCIO } from "../config/negocio";

interface Acceso {
  ruta: string;
  titulo: string;
  texto: string;
}

const ACCESOS: Acceso[] = [
  {
    ruta: "/productos",
    titulo: "Productos",
    texto:
      "Agrega, edita y controla tu inventario de shampoo, tintes, planchas y más.",
  },
  // { ruta: "/proveedores", titulo: "Proveedores", texto: "Mantén al día los datos de quienes te surten." },
  // { ruta: "/clientes", titulo: "Clientes", texto: "Consulta y registra a las personas que te compran." },
];

export default function InicioPage() {
  return (
    <section>
      <header className="inicio-hero">
        <h1>Bienvenida a {NEGOCIO.nombre}</h1>
        <p>
          Aquí administras el inventario... Aquí administras la comercializadora
          y la peluquería: lo que vendes, a quién se lo compras y quién te
          compra.
        </p>
      </header>

      <div className="inicio-accesos">
        {ACCESOS.map(({ ruta, titulo, texto }) => (
          <Link key={ruta} to={ruta} className="inicio-acceso">
            <h2>{titulo}</h2>
            <p>{texto}</p>
          </Link>
        ))}
      </div>

      <footer className="pie">
        © {NEGOCIO.anio} {NEGOCIO.nombre} · {NEGOCIO.descripcion}
      </footer>
    </section>
  );
}
