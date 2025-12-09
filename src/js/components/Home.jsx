import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import NewTaskList from "./NewTaskList";

//create your first component
const Home = () => {
	return (
		<div>
		<NewTaskList />
		</div>
	);
};

export default Home;