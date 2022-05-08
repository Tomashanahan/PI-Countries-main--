import axios from "axios";
import {
	GET_COUNTRY,
	GET_COUNTRIES,
	DELETE_ACTIVITY,
	GET_ACTIVITIES,
	ADD_ACTIVITY,
	CLEAN_COUNTRY_DETAIL,
	GET_COUNTRIES_SORTED_BY_NAME,
	GET_COUNTRY_BY_NAME,
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

export function get_country_by_name(name, order) {
	console.log("Action Input->", name);
	console.log("Action Order->", order);
	return (dispatch) => {
		axios
			.get(
				`http://localhost:3001/countries?name=${name}&order=${order}`
			)
			.then((res) => {
				dispatch({ type: GET_COUNTRY_BY_NAME, payload: res.data });
			})
			.catch((e) => console.log(e));
	};
}

export function get_countries_sorted_by_name(order) {
	return (dispatch) => {
		axios.get(`http://localhost:3001/countries?order=${order}`).then((res) => {
			dispatch({ type: GET_COUNTRIES_SORTED_BY_NAME, payload: res.data });
		});
	};
}

export function clean_country_detail() {
	return { type: CLEAN_COUNTRY_DETAIL };
}

export function get_activities() {
	return (dispatch) => {
		axios.get(`http://localhost:3001/activities`).then((res) => {
			dispatch({ type: GET_ACTIVITIES, payload: res.data });
		});
	};
}

export function delete_activity(id) {
	return (dispatch) => {
		axios.delete(`http://localhost:3001/activities/${id}`).then((res) => {
			dispatch({ type: DELETE_ACTIVITY, payload: res.data });
		});
	};
}

export function add_activity(activity) {
	return (dispatch) => {
		axios.post(`http://localhost:3001/activities`, activity).then((res) => {
			dispatch({ type: ADD_ACTIVITY });
		});
	};
}
