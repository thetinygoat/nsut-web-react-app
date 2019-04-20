import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Todos from './pages/todos';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<h1 style={{ textAlign: 'center' }}>TODO LIST</h1>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/todos" component={Todos} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
