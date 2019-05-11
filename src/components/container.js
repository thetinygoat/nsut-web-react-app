import styled from 'styled-components';
const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: 1em auto;
	@media (max-width: 730px) {
		width: 95%;
	}
`;

export default Container;
