import axios from "axios";
import {
	GET_COUNTRY,
	GET_COUNTRIES,
	DELETE_ACTIVITY,
	GET_ACTIVITY_COUNTRY,
	GET_ACTIVITIES,
	ADD_ACTIVITY,
	CLEAN_COUNTRY_DETAIL,
	GET_COUNTRIES_SORTED_BY_NAME,
	GET_COUNTRY_BY_NAME,
	CLEAN_GET_ACTIVITIES_COUNTRY,
	GET_COUNTRY_ACTIVITIES,
	DELETE_ACTIVITY_OF_PAIS
} from "./actions_types";

export function get_country(id) {
	return (dispatch) => {
		axios
			.get(`http://localhost:3001/countries/${id}`)
			.then((res) => {
				dispatch({ type: GET_COUNTRY, payload: res.data });
			})
			.catch((e) => dispatch({ type: GET_COUNTRY, payload: e }));
	};
}

export function get_countries() {
	return (dispatch) => {
		axios.get(`http://localhost:3001/countries?order=ASC`).then((res) => {
			dispatch({ type: GET_COUNTRIES, payload: res.data });
		});
	};
}

export function get_country_by_name(name, order, continent, type,activity) {
	return (dispatch) => {
		axios
			.get(
				`http://localhost:3001/countries?name=${name}&order=${order}&continent=${continent}&type=${type}&activity=${activity}`
			)
			.then((res) => {
				dispatch({ type: GET_COUNTRY_BY_NAME, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function get_countries_sorted_by_name(order) {
	return (dispatch) => {
		axios
			.get(`http://localhost:3001/countries?order=${order}&type=name`)
			.then((res) => {
				dispatch({ type: GET_COUNTRIES_SORTED_BY_NAME, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function clean_country_detail() {
	return { type: CLEAN_COUNTRY_DETAIL };
}

export function get_activities() {
	return (dispatch) => {
		axios
			.get(`http://localhost:3001/activities`)
			.then((res) => {
				dispatch({ type: GET_ACTIVITIES, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function get_country_activities(id) {
	return (dispatch) => {
		axios
			.get(`http://localhost:3001/activities/relacion?id=${id}`)
			.then((res) => {
				dispatch({ type: GET_COUNTRY_ACTIVITIES, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function get_activities_country(id,order,type,continent) {
	return (dispatch) => {
		// http://localhost:3001/activities/activity_country?id=4&order=DESC&type=name
		axios
			.get(`http://localhost:3001/activities/activity_country?id=${id}&order=${order}&type=${type}&continente=${continent}`)
			.then((res) => {
				dispatch({ type: GET_ACTIVITY_COUNTRY, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function clean_get_activities_country() {
	return {type : CLEAN_GET_ACTIVITIES_COUNTRY}
}

export function delete_activity(id) {
	return (dispatch) => {
		axios
			.delete(`http://localhost:3001/activities/${id}`)
			.then((res) => {
				dispatch({ type: DELETE_ACTIVITY, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function delete_activity_of_country(id_actividad,id_pais) {
	return (dispatch) => {
		axios
			.delete(`http://localhost:3001/activities/relacion/${id_actividad}/${id_pais}`)
			.then((res) => {
				dispatch({ type: DELETE_ACTIVITY_OF_PAIS, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function add_activity(activity) {
	return (dispatch) => {
		axios
			.post(`http://localhost:3001/activities`, activity)
			.then((res) => {
				dispatch({ type: ADD_ACTIVITY });
			})
			.catch((e) => console.log(e));
	};
}
