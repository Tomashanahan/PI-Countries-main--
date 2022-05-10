import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "../../Redux/Actions";
import Activity from "../Activity/Activity";
import './Activities.css'

function Activities() {
	const { activities } = useSelector((state) => state);
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(get_activities());
	}, []);

	return (
		<div className="activities_grid">
			{activities &&
				activities.map((activity) => {
					return <Activity key={activity.id} {...activity} />;
				})}
		</div>
	);
}

export default Activities;
