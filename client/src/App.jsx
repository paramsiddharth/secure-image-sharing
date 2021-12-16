import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { Home, ImgLanding, NotFound } from './pages';

function App() {

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/404' element={<NotFound />} />
			<Route path='/:id' element={<ImgLanding />} />
		</Routes>
	);
}

export default App;