import React from 'react'
import './App.css';
import RouteHandler from "./routers/Home.router";

function App() {
	return (
		<div className="app-container">
			<RouteHandler />
		</div>
	);
}

export default App;