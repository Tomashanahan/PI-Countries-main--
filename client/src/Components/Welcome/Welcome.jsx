import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import fondo from '../../img/Scene...17.png'

function Welcome() {
	return (
		<div className="bienvenidos">
			<img src={fondo} alt="fondo" width={'100%'}/>
				<div className="bienvenidos_info">
					<h2>Henry PI Countries - Tomas Shanahan</h2>
					<Link to="/home" className="bienvenidos_a">
						Home
					</Link>
				</div>
		</div>
	);
}

export default Welcome;
