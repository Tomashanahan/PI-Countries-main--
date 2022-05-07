import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Activities from "./Components/Activities/Activities";
import Add_activity from "./Components/Add_activity/Add_activity";
import Countries from "./Components/Countries/Countries";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Route exact path={"/"}>
				<Countries />
			</Route>
			<Route exact path={"/actividades"}>
				<Activities />
			</Route>
			<Route exact path={"/crear_actividad"}>
				<Add_activity />
			</Route>
		</div>
	);
}

export default App;
