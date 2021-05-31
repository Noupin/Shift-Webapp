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
import { videoTypes } from "../../constants";


export function Inference (props: IElevatedStateProps){
	const {elevatedState, setElevatedState} = props;

	const [inferenceMedia, setInferenceMedia] = useState("");
	const [baseMediaString, setBaseMediaString] = useState("")

	const [inference, setInference] = useState(true);
	const [stopInference, setStopInference] = useState(false);
	const [updating, setUpdating] = useState(false);
  const [inferenceResponse, setInferenceResponse] = useState<CombinedInferenceResponse>();
	const [updateProgress, setUpdateProgress] = useState(false);


	useEffect(() => {
		if(!inference) return;

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
		setInference(false)
	}, [inference]);

	useEffect(() => {
		if(!inferenceResponse) return;

		setElevatedState((prev) => ({...prev, msg: inferenceResponse.msg!}));
	}, [inferenceResponse]);

	useInterval(async () => {
		if(updateProgress) return;

		if(updating || !stopInference){
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
				setInferenceMedia(`${videoTypes.indexOf(inferenceResponse.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${inferenceResponse.mediaFilename!}`)
				setBaseMediaString(`${videoTypes.indexOf(inferenceResponse.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${inferenceResponse.baseMediaFilename!}`)
			}

			setStopInference(inferenceResponse.stopped!);

			if(stopInference){
				setUpdating(false);
			}
			else{
				setUpdating(true);
			}
		}
	}, 1000);


	return (
		<Container className="d-flex justify-content-center h-100 flex-column" key={inferenceMedia}>
			<Row className="mb-2">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" srcString={inferenceMedia} mediaType="media"/>
			</Row>
			<Row className="my-3">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" srcString={baseMediaString} mediaType="media"/>
			</Row>
			<Row className="my-2">
				<Col xs={1}></Col>
				<Col xs={2} className="pr-4">
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 w-100" disabled={inference}>&#x2190; Train More</Button>
          </Link>
				</Col>
				<Col xs={2} className="pl-4">
					<Link to="/load" className="w-100">
            <Button className="borderRadius-2 p-2 w-100" disabled={inference} onClick={() => setInference(true)}>Shift Again &#x21ba;</Button>
          </Link>
				</Col>
				<Col xs={1}></Col>
				<Col xs={5}>
					<Button className="borderRadius-2 p-2 w-100" disabled={inference}>Share</Button>
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Container>
	);
}