import React, {Component, Fragment} from "react";

import {
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import {
	Home,
	Login,
	Registration,
	Activate,
	Dashboard
} from "./screens";

class App extends Component{
	render() {
		return (
			<Switch>
				{
					!localStorage.getItem("token") ?
					(
						<Fragment>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/registration" component={Registration} />
							<Route path="/activate" component={Activate} />
						</Fragment>
					)
					:
					(
						<Fragment>
							<Route path="/" component={Dashboard} />
						</Fragment>
					)
				}
			</Switch>
		);
	}
}

export default App;
