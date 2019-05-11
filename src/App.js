import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Todos from './pages/todos';
import Notfound from './pages/notfound';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/todos" component={Todos} />
					<Route component={Notfound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
