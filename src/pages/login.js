import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect } from 'react-router-dom';
import Container from '../components/container';
const login = () => {
	// state for email password login status error and form state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedin, setloggedin] = useState(false);
	const [error, setError] = useState({ isError: false, reason: '' });
	const [loading, setLoading] = useState(false);
	const [invalidForm, setFormInvalidity] = useState(true);
	// submit handler
	const handleSubmit = async e => {
		setLoading(true);
		const res = await axios.post('/user/login', {
			email: email,
			password: password
		});
		// error handler
		if (!res.data.error) {
			localStorage.setItem('auth-token', res.data.token);
			setloggedin(true);
		} else {
			setLoading(false);
			setError({ isError: res.data.error, reason: res.data.reason });
		}
	};
	// use effect hook
	useEffect(() => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			setloggedin(true);
		}
		if (email.trim(' ').length > 0 && password.trim(' ').length > 0) {
			setFormInvalidity(false);
		} else {
			setFormInvalidity(true);
		}
	}, [email, password]);
	return (
		<Container>
			{error.isError && <div>{error.reason}</div>}
			<Card
				style={{
					// margin: '1em auto',
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
					disabled={invalidForm}
					color="primary"
					style={{ margin: '1em' }}
					onClick={() => handleSubmit()}
				>
					{loading ? <CircularProgress color="secondary" /> : 'Login'}
				</Button>
				<p style={{ textAlign: 'center' }}>OR</p>
				<Button component={Link} to="/signup" color="secondary">
					Sign up
				</Button>
				{loggedin && <Redirect to="/todos" />}
			</Card>
		</Container>
	);
};

export default login;
