/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


//First Party Imports
import { useInterval } from "../../Hooks/Interval";
import { Media } from '../../Components/Media/Media';
import { Button } from '../../Components/Button/Button';
import { InferenceAPIInstance } from '../../Helpers/Api';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { CombinedInferenceResponse } from '../../Interfaces/CombinedInference';
import { InferenceOperationRequest, InferenceRequest, InferenceStatusRequest } from '../../Swagger';


export function Shift (props: IElevatedStateProps){
	const {elevatedState, setElevatedState} = props;

	const [shiftedMedia, setShiftedMedia] = useState("");

	const [shifting, setShifting] = useState(true);
	const [stopShifting, setStopShifting] = useState(false);
	const [updating, setUpdating] = useState(false);
  const [inferenceResponse, setInferenceResponse] = useState<CombinedInferenceResponse>();
	const [updateProgress, setUpdateProgress] = useState(false);


	useEffect(() => {
		if(!shifting) return;

		const inferenceRequestParams: InferenceRequest = {
      shiftUUID: elevatedState().shiftUUID,
			usePTM: elevatedState().usePTM,
			prebuiltShiftModel: elevatedState().prebuiltShiftModel
    };
    const inferenceBody: InferenceOperationRequest = {
      body: inferenceRequestParams
    }

    InferenceAPIInstance.inference(inferenceBody).then((value) => {
      setInferenceResponse(value)
    })

		setUpdating(true);
		setShifting(false)
	}, [shifting]);

	useEffect(() => {
		if(!inferenceResponse) return;

		setElevatedState((prev) => ({...prev, msg: inferenceResponse.msg!}));
	}, [inferenceResponse]);

	useInterval(async () => {
		if(updateProgress) return;

		if(updating || !stopShifting){
			setUpdateProgress(true)

			const inferenceStatusRequestParams: InferenceRequest = {
				shiftUUID: elevatedState().shiftUUID,
				usePTM: elevatedState().usePTM,
				prebuiltShiftModel: elevatedState().prebuiltShiftModel
			};
			const inferenceStatusBody: InferenceStatusRequest = {
				body: inferenceStatusRequestParams
			}
	
			await InferenceAPIInstance.inferenceStatus(inferenceStatusBody).then((value) => {
				setInferenceResponse(value)
			})
			setUpdateProgress(false)

			if(inferenceResponse == null){
				return;
			}

			if(inferenceResponse.mediaFilename!){
				setShiftedMedia(`/api/content/image/${inferenceResponse.mediaFilename!}`)
			}

			setStopShifting(inferenceResponse.stopped!);

			if(stopShifting){
				setUpdating(false);
			}
			else{
				setUpdating(true);
			}
		}
	}, 1000);


	return (
		<Container className="d-flex justify-content-center h-100 flex-column" key={shiftedMedia}>
			<Row className="mb-2">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" srcString={shiftedMedia} mediaType="media"/>
			</Row>
			<Row className="my-3">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" srcString={shiftedMedia} mediaType="video/mp4"/>
			</Row>
			<Row className="my-2">
				<Col xs={1}></Col>
				<Col xs={2} className="pr-4">
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 w-100" disabled={shifting}>&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2} className="pl-4">
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 w-100" disabled={shifting} onClick={() => setShifting(true)}>Shift Again &#x21ba;</Button>
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