import {
	GET_COUNTRY,
	GET_COUNTRIES,
	DELETE_ACTIVITY,
	GET_ACTIVITIES,
	ADD_ACTIVITY,
	CLEAN_COUNTRY_DETAIL,
	GET_COUNTRIES_SORTED_BY_NAME,
	GET_COUNTRY_BY_NAME
} from "../Actions/actions_types";

const initialState = {
	country: {},
	countries: [],
	countries_sorted: [],
	activity: {},
	activities: [],
	search_country_name : []
};

function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_COUNTRIES: {
			return {
				...state,
				countries: payload,
			};
		}
		case GET_COUNTRY: {
			return {
				...state,
				country: payload[0],
			};
		}
		case GET_ACTIVITIES: {
			return {
				...state,
				activities: payload,
			};
		}
		case ADD_ACTIVITY: {
			return {
				...state,
			};
		}
		case DELETE_ACTIVITY: {
			return {
				...state,
			};
		}
		case CLEAN_COUNTRY_DETAIL: {
			return {
				...state,
				country: {},
			};
		}
		case GET_COUNTRIES_SORTED_BY_NAME: {
			return {
				...state,
				countries_sorted: payload,
			};
		}
		case GET_COUNTRY_BY_NAME: {
			return {
				...state,
				search_country_name: payload,
			};
		}
		default:
			return state;
	}
}

export default reducer;
