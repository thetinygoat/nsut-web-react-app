import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://ancient-plateau-61694.herokuapp.com/api'
});
export default instance;
