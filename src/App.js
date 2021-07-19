import {Switch, Route} from "react-router-dom";
import {
	Home,
	Login,
	Registration,
	Activate,
	Dashboard
} from "./screens";

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/registration" component={Registration} />
			<Route path="/activate" component={Activate} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	);
}

export default App;
