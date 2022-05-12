import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
	const [selected, setSelected] = useState("");
	console.log(selected);

	return (
		<div className="nav_bar">
			<Link className={"links-nav_bar"} to="/home">
				Home
			</Link>
			<Link
				onClick={() => setSelected("actividades")}
				className={"links-nav_bar"}
				to="/actividades"
			>
				Actividades
			</Link>
			<Link className={"links-nav_bar"} to="/crear_actividad">
				Agregar Actividad
			</Link>
		</div>
	);
}

export default Navbar;
