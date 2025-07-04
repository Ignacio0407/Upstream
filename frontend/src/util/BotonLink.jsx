import { Button } from "reactstrap";
import { Link } from "react-router-dom";

/**
 * Crea un botón con color y texto que redirecciona a una pantalla al ser pulsado. Usa Button y Link
 * @param {boolean} outline - define si el color del botón se aplicará al borde o al interior. Por defecto false.
 * @param {string} color - color del botón. Por defecto blanco
 * @param {string} direction - dirección a la que redirecciona.
 * @param {string} text - texto del botón.
 * @param {string} colorTexto - Opcional. color del texto del botón. Por defecto blanco
 */
export default function BotonLink({outline=false, color= "white", direction, text, colorTexto = "white"}) {
    return (
      <>
        <Button outline={outline} color={color} > 
        <Link 
          to={direction} className="btn sm"                
          style={{ textDecoration: "none", color: {colorTexto} }}>{text}
        </Link> 
        </Button>
      </>
    )  
  }