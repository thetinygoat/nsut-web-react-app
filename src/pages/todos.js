import React, { useEffect, useState } from 'react';
import axios from '../axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '../components/container';

const todos = () => {
	const fetchData = async () => {
		let token = await localStorage.getItem('auth-token');
		const response = await axios.get('/user', {
			headers: { 'x-access-token': token }
		});
		setTodos(response.data.todos);
		console.log(response.data);
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
			{todos && todos.map(todo => <div key={todo._id}>{todo.content}</div>)}
		</Container>
	);
};

export default todos;
