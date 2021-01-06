//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../Helpers/defaultMedia";
import { useFetch } from "../../Hooks/Fetch";
import { useBinaryImageCovnersion } from "../../Hooks/Images";


interface shiftRequestReturn {
	msg: string,
	testImage: string
}

let shiftResponse: shiftRequestReturn = {msg: "", testImage: ""}


export const Shift = (props: IElevatedPageState) => {
	const [image, setImage] = useState(defaultVideo);
	const [imageString, setImageString] = useState("");

	const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(shiftResponse);
	const [convertImage, imageFile, imageError, imageLoading] = useBinaryImageCovnersion()

	const requestOptions: RequestInit = {
		method: 'POST',
		credentials: "include",
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({shiftUUID: props.shiftUUID,
													usePTM: false,
													prebuiltShiftModel: ""})
	};


	async function shift(){
		apiFetch(`/api/inference`, requestOptions)
		setImageString(apiResponse.testImage)
		convertImage(imageString)
	}


	useEffect(() => {
		setImage(imageFile)
	}, [imageFile]);

	useEffect(() => {
		console.error(apiError);
	}, [apiError]);

	useEffect(() => {
		console.error(imageError);
	}, [imageError]);


	return (
		<Container className="d-flex justify-content-center h-100 flex-column">
			<Row className="mb-2">
				<Media className="neumorphic borderRadius-2 p-2 my-2 w-100" key={image.lastModified} mediaSrc={image} mediaType="video/mp4"/>
			</Row>
			<Row className="my-3">
				<Media className="neumorphic borderRadius-2 p-2 my-2 w-100" mediaSrc={defaultVideo} mediaType="video/mp4"/>
			</Row>
			<Row className="my-2">
				<Col xs={1}></Col>
				<Col xs={2}>
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-4 w-100">&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2}>
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 ml-4 w-100">Shift Again &#x21ba;</Button>
          </Link>
				</Col>
				<Col xs={1}></Col>
				<Col xs={5}>
					<Button className="borderRadius-2 p-2 w-100" disabled={apiLoading || imageLoading} onClick={shift}>Share</Button>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	);
}