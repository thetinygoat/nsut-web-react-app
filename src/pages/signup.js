import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '../components/container';
const signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedin, setloggedin] = useState(false);
	const [error, setError] = useState({ isError: false, reason: '' });
	const [invalidForm, setFormInvalidity] = useState(true);
	// submit handler
	const handleSubmit = async e => {
		const res = await axios.post('/user/new', {
			email: email,
			password: password
		});
		// error handler
		if (!res.data.error) {
			localStorage.setItem('auth-token', res.data.token);
			setloggedin(true);
		} else {
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
			<h1 style={{ textAlign: 'center' }}>SIGN UP</h1>
			{/* display error message */}
			<Snackbar
				open={error.isError}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				message={<span>{error.reason}</span>}
				autoHideDuration={6000}
			/>
			<Card
				style={{
					padding: '1em',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<TextField
					label="Email"
					type="email"
					style={{ margin: '1em' }}
					onChange={e => {
						setEmail(e.target.value);
					}}
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
					onClick={handleSubmit}
					disabled={invalidForm}
				>
					Sign up
				</Button>
				<p style={{ textAlign: 'center' }}>OR</p>
				<Button component={Link} to="/" color="secondary">
					Login
				</Button>
				{loggedin && <Redirect to="/todos" />}
			</Card>
		</Container>
	);
};

export default signup;
