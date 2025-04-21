import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer"> 
      <div className="social-icons">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} /> 
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div className="menu">
        <a href="#">Inicio</a>
        <a href="#">Sobre Nosotros</a>
        <a href="#">Contacto</a>
      </div>
      <div className="copyright">© 2025 Blog de CEPI</div>
    </footer>
  );
}