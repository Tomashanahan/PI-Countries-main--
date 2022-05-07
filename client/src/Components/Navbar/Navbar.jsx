import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
	return (
		<div className="nav_bar">
			<Link className="links-nav_bar" to="/">
				Home
			</Link>
			<Link className="links-nav_bar" to="/actividades">
				Actividades
			</Link>
			<Link className="links-nav_bar" to="/crear_actividad">
				Agregar Actividad
			</Link>
		</div>
	);
}

export default Navbar;
