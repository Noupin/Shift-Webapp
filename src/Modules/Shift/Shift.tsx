//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../Helpers/defaultMedia";


interface shiftRequestReturn {
    msg: string,
    testImage: string
  }

export const Shift = (props: IElevatedPageState) => {
	const [image, setImage] = useState("");

	const requestOptions: RequestInit = {
		method: 'POST',
		credentials: "include",
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({shiftUUID: props.shiftUUID,
													usePTM: false,
													prebuiltShiftModel: ""})
	};

	const shift = () => {
		fetch(`/api/inference`, requestOptions).then(res => res.json()).then((data: shiftRequestReturn) => {
			setImage(data.testImage);
			props.setMsg(data.msg);
			console.log(data);
		})
		.catch(error => {
			console.error(error);
		});
	}

	return (
		<Container className="d-flex justify-content-center h-100 flex-column">
			<Row className="mb-2">
				<Media className="neumorphic borderRadius-2 p-2 my-2" mediaSrc={defaultVideo} mediaType="video/mp4" droppable={false}/>
			</Row>
			<Row className="my-3">
				<Media className="neumorphic borderRadius-2 p-2 my-2" mediaSrc={defaultVideo} mediaType="video/mp4" droppable={false}/>
			</Row>
			<Row className="mt-2">
				<Col xs={1}></Col>
				<Col xs={2}>
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-4">&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2}>
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 ml-4">Shift Again &#x21ba;</Button>
          </Link>
				</Col>
				<Col xs={1}></Col>
				<Col xs={5}>
					<Button className="borderRadius-2 p-2" onClick={shift}>Share</Button>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	);
}