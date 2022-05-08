import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Activities from "./Components/Activities/Activities";
import Add_activity from "./Components/Add_activity/Add_activity";
import Countries from "./Components/Countries/Countries";
import CountryDetail from './Components/Country_detail/Contry_detail'
import SearchBar from "./Components/SearchBar.jsx/SearchBar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Route exact path={"/"}>
				<SearchBar/>
				<Countries />
			</Route>
			<Route exact path={"/actividades"}>
				<Activities />
			</Route>
			<Route exact path={"/crear_actividad"}>
				<Add_activity />
			</Route>
			<Route exact path={"/country_detail/:id"}>
				<CountryDetail/>
			</Route>
		</div>
	);
}

export default App;
