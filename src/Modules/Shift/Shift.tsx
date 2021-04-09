//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


//First Party Imports
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../constants";
import { useFetch } from "../../Hooks/Fetch";
import { useInterval } from "../../Hooks/Interval";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface shiftRequestReturn {
	msg: string,
	stopped: boolean
}


export function Shift (props: IElevatedStateProps){
	const {elevatedState, setElevatedState, ...shiftProps} = props;

	const [image, setImage] = useState(defaultVideo);

	const [shifting, setShifting] = useState(true);
	const [stopShifting, setStopShifting] = useState(false);
	const [updating, setUpdating] = useState(false);
  const [shiftResponse, setShiftResponse] = useState<shiftRequestReturn>();
	const [updateProgress, setUpdateProgress] = useState(false);
	const [fileResponse, setFileResponse] = useState<Blob>();

	let requestOptions: RequestInit = {};

	function updateRequestOptions(method: string="POST"){
    requestOptions = {
			method: method,
			credentials: "include",
			headers: { 'Content-Type': 'application/json'},
			body: method === "POST" ? JSON.stringify({shiftUUID: elevatedState().shiftUUID,
															  usePTM: elevatedState().usePTM,
															  prebuiltShiftModel: elevatedState().prebuiltShiftModel}) : null
		};
  }



	const fetchInference = useFetch(setShifting, setElevatedState, setShiftResponse, `/api/inference`, () => requestOptions, shiftResponse)
	const updateStatus = useFetch(setUpdateProgress, setElevatedState, setShiftResponse, `/api/inferenceStatus`, () => requestOptions, shiftResponse)
	const getMedia = useFetch(setUpdateProgress, setElevatedState, setFileResponse, `/api/content/image/${elevatedState().shiftUUID}`, () => requestOptions, fileResponse)


	useEffect(() => {
		if(!shifting) return;

		updateRequestOptions();

		fetchInference();
		setUpdating(true);
	}, [shifting]);

	useEffect(() => {
		if(!shiftResponse) return;

		setElevatedState((prev) => ({...prev, msg: shiftResponse.msg}));
	}, [shiftResponse]);

	useInterval(() => {
		if(updating || !stopShifting){
			updateRequestOptions();
			updateStatus();

			if(shiftResponse == null){
				return;
			}

			setStopShifting(shiftResponse.stopped);

			if(stopShifting){
				setUpdating(false);
				updateRequestOptions("GET")
				getMedia("blob");

				if(fileResponse == null){
					setUpdating(true);
					return;
				}

				setImage(new File([fileResponse], 'shifted.png', {type: "media"}))
				console.log(image)
			}
			else{
				setUpdating(true);
			}
		}
	}, 1000);


	return (
		<Container className="d-flex justify-content-center h-100 flex-column" key={image.lastModified}>
			<Row className="mb-2">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 p-2 my-2 w-100" mediaSrc={image} mediaType="media"/>
			</Row>
			<Row className="my-3">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 p-2 my-2 w-100" mediaSrc={defaultVideo} mediaType="video/mp4"/>
			</Row>
			<Row className="my-2">
				<Col xs={1}></Col>
				<Col xs={2}>
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-4 w-100" disabled={shifting}>&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2}>
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 ml-4 w-100" disabled={shifting} onClick={() => setShifting(true)}>Shift Again &#x21ba;</Button>
          </Link>
				</Col>
				<Col xs={1}></Col>
				<Col xs={5}>
					<Button className="borderRadius-2 p-2 w-100" disabled={shifting}>Share</Button>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	);
}