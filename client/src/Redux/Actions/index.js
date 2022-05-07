import axios from "axios";
import {
	GET_COUNTRY,
	GET_COUNTRIES,
	DELETE_ACTIVITY,
	GET_ACTIVITIES,
	ADD_ACTIVITY,
} from "./actions_types";

export function get_country(name) {
	return (dispatch) => {
		axios.get(`http://localhost:3001/countries?name=${name}`).then((res) => {
			dispatch({ type: GET_COUNTRY, payload: res.data });
		})
        .catch(e => console.log(e))
	};
}

export function get_countries() {
	return (dispatch) => {
		axios.get(`http://localhost:3001/countries`).then((res) => {
			dispatch({ type: GET_COUNTRIES, payload: res.data });
		});
	};
}

export function get_activities() {
	return (dispatch) => {
		axios.get(`http://localhost:3001/activities`).then((res) => {
			dispatch({ type: GET_ACTIVITIES, payload: res.data });
		});
	};
}

export function delete_activity(id){
    return dispatch => {
        axios.delete(`http://localhost:3001/activities/${id}`)
        .then(res => {
            dispatch({type : DELETE_ACTIVITY, payload : res.data})
        })
    }
}

export function add_activity(activity) {
	return (dispatch) => {
		axios.post(`http://localhost:3001/activities`, activity).then((res) => {
			dispatch({ type: ADD_ACTIVITY });
		});
	};
}
