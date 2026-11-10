import { Form } from "react-bootstrap";

interface BuscadorProps {
  valor: string;
  onCambio: (texto: string) => void;
  placeholder: string;
}

// Campo de búsqueda controlado: el texto vive en el padre (valor + onCambio).
export default function Buscador({ valor, onCambio, placeholder }: BuscadorProps) {
  return (
    <Form.Control
      type="search"
      className="buscador"
      value={valor}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(e) => onCambio(e.target.value)}
    />
  );
}
