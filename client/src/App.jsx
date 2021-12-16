import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	Container,
	Paper,
	AppBar,
	Toolbar,
	TextField,
	createTheme,
	ThemeProvider,
	Typography,
	Button
} from '@mui/material';

import './App.css';

const theme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	const [img, setImg] = useState(null);
	const [pwd, setPwd] = useState('');
	const [err, setErr] = useState(false);

	const setImage = file => {
		setErr(false);
		setImg(file);
	};

	const setPassword = pass => {
		if (pass.length < 1)
			setErr('The password must be non-empty.');
		else
			setErr(false);
		setPwd(pass);
	};

	const submit = async () => {
		if (img == null) {
			setErr('Select an image.');
			return;
		}
		if (pwd.length < 1) {
			setErr('The password must be non-empty.');
			return;
		}
		alert(`Image: ${img.name}\nPassword: ${pwd}`);
	};

	return (
		<>
			<Helmet>
				<title>Share Images</title>
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
						<Typography pb={2}>Select the image file:</Typography>
						<Button
							variant='contained'
							color='success'
							component='label'
							>
							Upload
							<input
								onChange={e => setImage(e.target.files[0])}
								// value={img}
								type='file' accept='image/*' hidden />
						</Button>
						&nbsp;{ img ? <>
							{ img.name } ({ (img.size / (1024 ** 2)).toFixed(2) } MB)
						</> : '' }
						<br />
						<br />
						{
							img ?
							<>
								<TextField
									required
									autoComplete='off'
									label='Password'
									type='password'
									value={pwd}
									onChange={e => setPassword(e.target.value)} />
								<br />
								<br />
							</>
							: ''
						}
						{ err ? <>
							<Typography
								color='red'
								variant='subtitle1'
								>
								{ err }
							</Typography>
							<br />
						</> : '' }
						<Button
							onClick={submit}
							variant='contained' color='primary'>
							Share!
						</Button>
					</Paper>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;