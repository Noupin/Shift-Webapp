//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


//First Party Imports
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../constants";
import { useFetch } from "../../Helpers/Fetch";
import { useConvertImage } from "../../Helpers/Images";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface shiftRequestReturn {
	msg: string,
	testImage: string
}


export function Shift (props: IElevatedStateProps){
	const {elevatedState, setElevatedState, ...navProps} = props;

	const [image, setImage] = useState(defaultVideo);
	const [imageString, setImageString] = useState("");

	const [fetching, setFetching] = useState(true);
  const [shiftResponse, setShiftResponse] = useState<shiftRequestReturn>();
  const [converting, setConverting] = useState(false);

	let requestOptions: RequestInit = {};


	const apiFetch = useFetch(setFetching, setElevatedState, setShiftResponse, `/api/inference`, () => requestOptions, shiftResponse)
	const convertImage = useConvertImage(setConverting, setElevatedState, setImage, () => imageString);


	useEffect(() => {
		if(!fetching) return;

		requestOptions = {
			method: 'POST',
			credentials: "include",
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({shiftUUID: elevatedState().shiftUUID,
														usePTM: false,
														prebuiltShiftModel: ""})
		}

		 apiFetch()
	}, [fetching]);

	useEffect(() => {
		if(!shiftResponse) return;

		setElevatedState((prev) => ({...prev, msg: shiftResponse!.msg}));
		setImageString(shiftResponse!.testImage)
	}, [shiftResponse]);

	useEffect(() => {
		if(!imageString) return;
		convertImage()
	}, [imageString]);

	useEffect(() => {
		if(image === defaultVideo) return;

		console.log("Image Converted")
	}, [image]);


	return (
		<Container className="d-flex justify-content-center h-100 flex-column" key={image.lastModified}>
			<Row className="mb-2">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 p-2 my-2 w-100" mediaSrc={image} mediaType="video/mp4"/>
			</Row>
			<Row className="my-3">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 p-2 my-2 w-100" mediaSrc={defaultVideo} mediaType="video/mp4"/>
			</Row>
			<Row className="my-2">
				<Col xs={1}></Col>
				<Col xs={2}>
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-4 w-100" disabled={fetching || converting}>&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2}>
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 ml-4 w-100" disabled={fetching || converting}>Shift Again &#x21ba;</Button>
          </Link>
				</Col>
				<Col xs={1}></Col>
				<Col xs={5}>
					<Button className="borderRadius-2 p-2 w-100" disabled={fetching || converting}>Share</Button>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	);
}