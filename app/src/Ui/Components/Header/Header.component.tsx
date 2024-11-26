import "./Header.style.css";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/">
          <img className="app-header_logo" alt="logo da aplicação" src={logo} />
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/historico">Histórico de Viagens</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
