import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link, Redirect } from 'react-router-dom';
const login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedin, setloggedin] = useState(false);
	const handleSubmit = async e => {
		const res = await axios.post('/user/login', {
			email: email,
			password: password
		});
		if (!res.data.error) {
			localStorage.setItem('auth-token', res.data.token);
			setloggedin(true);
		}
	};
	useEffect(() => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			setloggedin(true);
		}
	}, []);
	return (
		<Card
			style={{
				width: '50%',
				margin: '1em auto',
				padding: '1em',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<TextField
				type="email"
				label="Email"
				style={{ margin: '1em' }}
				onChange={e => setEmail(e.target.value)}
			/>
			<TextField
				label="Password"
				type="password"
				style={{ margin: '1em' }}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button
				variant="contained"
				color="primary"
				style={{ margin: '1em' }}
				onClick={() => handleSubmit()}
			>
				Login
			</Button>
			<p>
				<Link to="/signup">Sign Up</Link> instead
			</p>
			{loggedin && <Redirect to="/todos" />}
		</Card>
	);
};

export default login;
