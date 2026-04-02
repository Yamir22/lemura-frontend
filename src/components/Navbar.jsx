import { NavLink } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__top">
                <span className="navbar-logo">LEMURA</span>
                <p className="navbar-tagline">Arreglos florales con alma</p>
            </div>

            {/* Nav con NavLink: agrega la clase --activo cuando la ruta coincide */}
            <nav className="navbar__nav">
                {/* end: solo marca activo cuando la URL es exactamente "/" */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-link--activo" : "nav-link"
                    }
                >
                    Catálogo
                </NavLink>

                <NavLink
                    to="/arma-tu-arreglo"
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-link--activo" : "nav-link"
                    }
                >
                    Arma tu arreglo
                </NavLink>

                <NavLink
                    to="/contacto"
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-link--activo" : "nav-link"
                    }
                >
                    Contacto
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-link--activo" : "nav-link"
                    }
                >
                    Admin
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar
