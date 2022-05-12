import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Activities from "./Components/Activities/Activities";
import Addactivity from "./Components/Add_activity/Add_activity";
import Countries from "./Components/Countries/Countries";
import CountryDetail from "./Components/Country_detail/Contry_detail";
import SearchBar from "./Components/SearchBar.jsx/SearchBar";
import Welcome from "./Components/Welcome/Welcome";

function App() {
	const [pagina, setPagina] = useState(1);
	return (
		<div className="App">
			<Route exact path={"/"}>
				<Welcome />
			</Route>
			<Route exact path={"/home"}>
				<Navbar />
				<SearchBar setPagina={setPagina} />
				<Countries pagina={pagina} setPagina={setPagina} />
			</Route>
			<Route exact path={"/actividades"}>
				<Navbar />
				<Activities />
			</Route>
			<Route exact path={"/crear_actividad"}>
				<Navbar />
				<Addactivity />
			</Route>
			<Route exact path={"/country_detail/:id"}>
				<Navbar />
				<CountryDetail />
			</Route>
		</div>
	);
}

export default App;
