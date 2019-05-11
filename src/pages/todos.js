import React, { useEffect, useState } from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '../components/container';
import { Redirect } from 'react-router-dom';

const todos = () => {
	const [isLoggedin, setLoggedin] = useState(true);
	const fetchData = async () => {
		let token = await localStorage.getItem('auth-token');
		if (!token) {
			setLoggedin(false);
			return;
		}
		const response = await axios.get('/user', {
			headers: { 'x-access-token': token }
		});
		setTodos(response.data.todos);
	};
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const [newTodo, setNewTodo] = useState('');
	const handleNewTodo = async e => {
		let token = await localStorage.getItem('auth-token');
		if (newTodo.trim(' ').length > 0) {
			const res = await axios.post(
				'/todo/new',
				{ content: newTodo },
				{ headers: { 'x-access-token': token } }
			);
			const createdTodo = [res.data, ...todos];
			setTodos(createdTodo);
		} else {
			alert('Todo content cannot be empty!');
		}
	};
	return (
		<Container>
			<h1 style={{ textAlign: 'center' }}>TODO LIST</h1>
			<TextField
				label="Create new todo"
				style={{ margin: '1em' }}
				onChange={e => {
					setNewTodo(e.target.value);
				}}
			/>
			<Button
				variant="contained"
				color="primary"
				style={{ margin: '1em' }}
				onClick={handleNewTodo}
			>
				Create
			</Button>
			{todos &&
				todos.map(todo => (
					<Card style={{ margin: '.3em 0', padding: '1em' }} key={todo._id}>
						{todo.content}
					</Card>
				))}
			{!isLoggedin && <Redirect to="/" />}
		</Container>
	);
};

export default todos;
