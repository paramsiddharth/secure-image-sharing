import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid as GridLoader } from 'react-css-spinners';
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
import download from 'downloadjs';

import theme from '../theme';

const ImgLanding = () => {
	const { id } = useParams();
	const [raw, setRaw] = useState(null);
	const [img, setImg] = useState(null);
	const [pwd, setPwd] = useState('');
	const [err, setErr] = useState(false);
	const [unlocked, unlock] = useState(false);

	useEffect(async () => {
		try {
			const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}${id}`);
			const imgData = resp.data;
			setRaw(imgData);
		} catch (e) {
			window.location = './404';
		}
	}, []);

	const attemptToUnlock = () => {
		try {
			setImg(AES.decrypt(raw, pwd).toString(encodings.Utf8));
			unlock(true);
		} catch (e) {
			setErr('Invalid password.');
			return;
		}
		setErr('');
	};

	return  <>
		<Helmet>
			<title>Download Image</title>
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
					{
						raw ? (
							unlocked ? <>
								<img width='50%' src={img} />
								<br />
								<br />
								<Button onClick={() => download(img, 'image')} variant='contained' color='success'>Download</Button>
							</> : <>
								<TextField
									type='password'
									value={pwd}
									onChange={e => setPwd(e.target.value)}
									label='Password'
									style={{ paddingBottom: 10 }}
								/>
								{ err ? <>
									<br />
									{ <Typography variant='subtitle1' color='red'>{ err }</Typography> }
								</> : '' }
								<br />
								<Button onClick={attemptToUnlock} variant='contained' color='error'>Unlock</Button>
							</>
						) : <>
							<GridLoader />
							<br />
							<br />
							{ err ? <Typography variant='subtitle1' color='red'>{ err }</Typography> : '' }
						</>
					}
				</Paper>
			</Container>
		</ThemeProvider>
	</>;
};

export default ImgLanding;