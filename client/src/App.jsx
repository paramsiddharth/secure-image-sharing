import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Home, ImgLanding } from './pages';

function App() {

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/:id' element={<ImgLanding />} />
		</Routes>
	);
}

export default App;