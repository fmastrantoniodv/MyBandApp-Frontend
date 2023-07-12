import React, { useState, useEffect, useRef, useContext } from 'react';
import { FileContext } from './contexts/fileContext'

function UploadAudio(sample, history){
	const inputFile = useRef(null);
	const { fileURL, setFileURL } = useContext(FileContext);
	const [file, setFile] = useState(null);

	const sampleFileName = getFileName(sample.sample)
	const fileUrlToFunction = './../../../public/samples/'+getFileName(sample.sample)

	console.log('sample: ');
	console.log(sample.sample);

	console.log('history: ');
	console.log(history);


	useEffect(() => {
		if (file) {
			setFileURL(file);
			history.push('/edit');
			console.log('entré al useEffect de UploadAudio')
		}
	}, [file, setFileURL, history]);
	
	setFile(URL.createObjectURL(fileUrlToFunction));
	console.log('file: ');
	console.log(file);
}

function getFileName(sample){
	const fileNameWithExtension = sample._src.split('/').pop(); // "file.txt"
	return fileNameWithExtension;
}

export default UploadAudio;
