import { useEffect, useState } from 'react';

const InputImg = ({ file }) => {
	const [img, setImg] = useState(null);

	const load = async () => {
		const reader = new FileReader();
		reader.addEventListener('load', () => setImg(reader.result), false);

		reader.readAsDataURL(file);
	};
	
	load();
	
	return img ? <img width='50%' src={img} /> : '';
};

export default InputImg;