import React from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
const login = () => {
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
			<TextField label="Email" style={{ margin: '1em' }} />
			<TextField label="Password" type="password" style={{ margin: '1em' }} />
			<Button variant="contained" color="primary" style={{ margin: '1em' }}>
				Login
			</Button>
			<p>
				<Link to="/signup">Sign Up</Link> instead
			</p>
		</Card>
	);
};

export default login;
