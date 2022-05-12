import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
	return (
		<div className="bienvenidos">
			<div className="x">
				<div className="bienvenidos_info">
					<h2>Henry PI Countries - Tomas Shanahan</h2>
					<Link to="/home" className="bienvenidos_a">
						Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Welcome;
