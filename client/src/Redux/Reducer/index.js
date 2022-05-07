import {
	GET_COUNTRY,
	GET_COUNTRIES,
	DELETE_ACTIVITY,
	GET_ACTIVITIES,
	ADD_ACTIVITY,
} from "../Actions/actions_types";

const initialState = {
	country: {},
	countries: [],
	activity: {},
	activities: [],
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
		default:
			return state;
	}
}

export default reducer;
