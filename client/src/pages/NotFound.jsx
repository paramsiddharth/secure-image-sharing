import { Helmet } from 'react-helmet-async';
import {
	Container,
	Paper,
	AppBar,
	Toolbar,
	ThemeProvider,
	Typography,
	Button
} from '@mui/material';
import { Link } from 'react-router-dom';

import theme from '../theme';

const NotFound = () => {return <>
		<Helmet>
			<title>404 - Not Found</title>
		</Helmet>
		<ThemeProvider theme={theme}>
			<AppBar position='static'>
				<Toolbar variant='dense'>
					<Typography variant='h6'>Image Sharing Service</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Paper style={{
					padding: '50px 40px'
				}}>
					<Typography pb={2}>Invalid URL.</Typography>
					<Button
						variant='contained'
						color='success'
						component={Link}
						to='/'
						>
						Back to Home
					</Button>
				</Paper>
			</Container>
		</ThemeProvider>
	</>;
};

export default NotFound;