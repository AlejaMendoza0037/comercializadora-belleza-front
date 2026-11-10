import { useEffect, useState, type FormEvent } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import type {
  CampoFormulario,
  DatosFormulario,
  ValoresFormulario,
} from "../types/formulario";

interface ModalFormularioProps<TForm extends DatosFormulario> {
  visible: boolean;
  titulo: string;
  campos: CampoFormulario<TForm>[];
  valoresIniciales: ValoresFormulario<TForm>;
  onGuardar: (datos: TForm) => Promise<void>;
  onCerrar: () => void;
}

// Ventana con formulario que se arma sola a partir de la lista "campos".
export default function ModalFormulario<TForm extends DatosFormulario>({
  visible,
  titulo,
  campos,
  valoresIniciales,
  onGuardar,
  onCerrar,
}: ModalFormularioProps<TForm>) {
  const [valores, setValores] =
    useState<ValoresFormulario<TForm>>(valoresIniciales);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Cada vez que se abre la ventana, el formulario arranca con los valores correctos
  // (vacíos si es crear, los del registro si es actualizar).
  useEffect(() => {
    if (visible) {
      setValores(valoresIniciales);
      setError("");
    }
  }, [visible, valoresIniciales]);

  function cambiar(nombre: Extract<keyof TForm, string>, valor: string): void {
    setValores((anteriores) => ({ ...anteriores, [nombre]: valor }));
  }

  async function enviar(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setGuardando(true);
    setError("");
    try {
      // Convierte a número los campos numéricos (antes se enviaban como texto).
      const datos: DatosFormulario = {};
      campos.forEach((c) => {
        const texto = valores[c.nombre];
        datos[c.nombre] = c.tipo === "number" ? Number(texto) : texto.trim();
      });
      await onGuardar(datos as TForm);
      onCerrar();
    } catch {
      setError("No se pudo guardar. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <Modal show={visible} onHide={onCerrar} centered>
      <Form onSubmit={enviar}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {campos.map((c) => (
            <Form.Group
              className="mb-3"
              controlId={`campo-${c.nombre}`}
              key={c.nombre}
            >
              <Form.Label>{c.etiqueta}</Form.Label>
              {c.tipo === "select" ? (
                <Form.Select
                  required
                  value={valores[c.nombre]}
                  onChange={(e) => cambiar(c.nombre, e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {(c.opciones ?? []).map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  required
                  type={c.tipo}
                  min={c.tipo === "number" ? 0 : undefined}
                  step={c.tipo === "number" ? "any" : undefined}
                  value={valores[c.nombre]}
                  onChange={(e) => cambiar(c.nombre, e.target.value)}
                />
              )}
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCerrar}>
            Cerrar
          </Button>
          <Button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
