import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename={ import.meta.env.BASE_ROUTE ?? '' }>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);