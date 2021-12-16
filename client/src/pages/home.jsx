import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	Container,
	Paper,
	AppBar,
	Toolbar,
	TextField,
	ThemeProvider,
	Typography,
	Button
} from '@mui/material';
import { AES, enc as encodings } from 'crypto-js';
import axios from 'axios';

import theme from '../theme';

const Home = () => {
	const [img, setImg] = useState(null);
	const [uri, setURI] = useState(null);
	const [pwd, setPwd] = useState('');
	const [err, setErr] = useState(false);

	const load = file => new Promise(done => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			setURI(reader.result);
			done();
		}, false);

		reader.readAsDataURL(file);
	});

	const setImage = file => {
		setErr(false);
		setImg(file);
		load(file);
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
		if (uri == null)
			await load(img);
		const encrypted = AES.encrypt(uri, pwd);
		const resp = await axios.post(import.meta.env.VITE_SERVER_URL, encrypted.toString());
		const id = resp.data;
		window.location = `./${id}`;
	};

	return <>
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
							type='file' accept='image/*' hidden />
					</Button>
					&nbsp;
					{ img ? <>
						{ img.name } ({ (img.size / (1024 ** 2)).toFixed(2) } MB)
					</> : '' }
					<br />
					<br />
					{
						uri ?
							<>
								<img width='50%' src={uri} />
								<br />
								<br />
							</>
						: ''
					}
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
	</>;
};

export default Home;