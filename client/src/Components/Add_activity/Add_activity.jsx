import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	get_countries_sorted_by_name,
	add_activity,
} from "../../Redux/Actions/index";

import "./Add_acttivity.css";

function Addactivity() {
	let { countries_sorted } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		name: "",
		dificultad: "",
		duracion: "",
		temporada: "",
	});

	let [inputErrores, setInputErrores] = useState({
		name: "",
		dificultad: "",
		duracion: "",
		temporada: "",
	});

	let [paises, setPaises] = useState([]);

	useEffect(() => {
		dispatch(get_countries_sorted_by_name("ASC"));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		/* Name */
		if (inputValues.name === "") {
			setInputErrores(
				(inputErrores = { ...inputErrores, name: "Campo requerido" })
			);
		} else if (inputValues.name !== "") {
			setInputErrores((inputErrores = { ...inputErrores, name: "" }));
		}
		/* Dificultad */
		if (inputValues.dificultad === "") {
			setInputErrores(
				(inputErrores = { ...inputErrores, dificultad: "Campo requerido" })
			);
		} else if (inputValues.dificultad > 5 || inputValues.dificultad < 1) {
			setInputErrores(
				(inputErrores = {
					...inputErrores,
					dificultad: "La dificultad solo puede ser entre 1 y 5",
				})
			);
		} else if (inputValues.dificultad < 5 || inputValues.dificultad > 1) {
			setInputErrores((inputErrores = { ...inputErrores, dificultad: "" }));
		} else if (inputValues.dificultad !== "") {
			setInputErrores((inputErrores = { ...inputErrores, dificultad: "" }));
		}
		/* Duracion */
		if (inputValues.duracion === "") {
			setInputErrores(
				(inputErrores = { ...inputErrores, duracion: "Campo requerido" })
			);
		} else if (inputValues.duracion < 0) {
			setInputErrores(
				(inputErrores = {
					...inputErrores,
					duracion: "La duracion tiene que ser un valor positivo",
				})
			);
		} else if (inputValues.duracion !== "") {
			setInputErrores((inputErrores = { ...inputErrores, duracion: "" }));
		}
		/* Temporada */
		if(inputValues.temporada === ''){
			setInputErrores(inputErrores = {...inputErrores, temporada : 'Falto elegir una temporada'})
		} else if(inputValues.temporada !== ''){
			setInputErrores(inputErrores = {...inputErrores, temporada : ''})
		}

		if(Object.values(inputErrores).filter(e => e !== '').length === 0){
			console.log({ ...inputValues, pais: paises });
			dispatch(add_activity({ ...inputValues, pais: paises }));
			alert("agregado");
		}
	}

	function inputChange(e) {
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	}

	function selectChage(e) {
		// console.log(e.target.value.name);
		setPaises(
			paises.includes(e.target.value)
				? (paises = paises.filter((elem) => elem !== e.target.value))
				: [...paises, e.target.value]
		);
	}
	console.log(paises);

	return (
		<div className="add_activity">
			<form onSubmit={handleSubmit} className="add_activity-form">
				<label className="add_activity-label" htmlFor="">
					Nombre
				</label>
				<input
					className="add_activity-input input_1"
					type="text"
					name="name"
					onChange={inputChange}
					autoFocus
				/>
				{inputErrores.name !== "" ? (
					<p className="error">{inputErrores.name}</p>
				) : null}

				<label className="add_activity-label" htmlFor="">
					Dificultad
				</label>
				<input
					className="add_activity-input input_1"
					name="dificultad"
					type="number"
					onChange={inputChange}
				/>
				{inputErrores.dificultad !== "" ? (
					<p className="error">{inputErrores.dificultad}</p>
				) : null}

				<label className="add_activity-label" htmlFor="">
					Duracion
				</label>
				<input
					className="add_activity-input"
					name="duracion"
					type="number"
					onChange={inputChange}
				/>
				{inputErrores.duracion !== "" && (
					<p className="error">{inputErrores.duracion}</p>
				)}

				<label className="add_activity-label" htmlFor="">
					Pais/es
				</label>
				<select
					className="add_activity-select"
					name={"pais"}
					onClick={selectChage}
					multiple
				>
					{countries_sorted.length > 0 &&
						countries_sorted.map((country) => {
							return (
								<option
									className={`add_activity-option ${
										paises.includes(country.id) ? "pais_seleccionado" : ""
									}`}
									key={country.id}
									value={country.id}
								>
									{country.name}
								</option>
							);
						})}
				</select>

				<label className="add_activity-label" htmlFor="">
					Temporada
				</label>
				<select
					className="add_activity-select"
					name={"temporada"}
					onChange={inputChange}
				>
					<option value="">Temporada</option>
					<option value="Verano">Verano</option>
					<option value="Otoño">Otoño</option>
					<option value="Invierno">Invierno</option>
					<option value="Primavera">Primavera</option>
				</select>
				{inputErrores.dificultad !== "" ? (
					<p className="error">{inputErrores.temporada}</p>
				) : null}

				<button className="add_activity-button" type="submit">
					Agregar
				</button>
			</form>
		</div>
	);
}

export default Addactivity;