//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { IElevatedPageState } from "../../Interfaces/PageState";


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
		<Container>
			<Row>
				<Col>
					<Link to="/train" className="w-100">
            <Button>Train Again?</Button>
          </Link>
				</Col>
				<Col>
					<Button onClick={shift}>Shift</Button>
				</Col>
			</Row>
			<Row>
				<img src={`data:image/jpeg;base64,${image}`} alt="Img" />
			</Row>
		</Container>
	);
}