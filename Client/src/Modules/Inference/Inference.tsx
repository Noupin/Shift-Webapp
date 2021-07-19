/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'


//First Party Imports
import { useInterval } from "../../Hooks/Interval";
import { Media } from '../../Components/Media/Media';
import { Button } from '../../Components/Button/Button';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { CombinedInferenceResponse } from '../../Interfaces/CombinedInference';
import { InferenceOperationRequest, InferenceRequest,
				 InferenceStatusRequest } from '../../Swagger';
import { pageTitles } from "../../constants";
import { Loader } from "../../Components/Loader/Loader";
import { useFetch } from '../../Hooks/Fetch';
import { urlToFile } from "../../Helpers/Files";


export function Inference (props: IElevatedStateProps){
	const {elevatedState, setElevatedState} = props;

	const [inferenceMedia, setInferenceMedia] = useState<File>();
	const [baseMediaString, setBaseMediaString] = useState("")

	const [inference, setInference] = useState(true);
	const [stopInference, setStopInference] = useState(false);
	const [updating, setUpdating] = useState(false);
  const [inferenceResponse, setInferenceResponse] = useState<CombinedInferenceResponse>();
	const [updateProgress, setUpdateProgress] = useState(false);

	const fetchInference = useFetch(elevatedState().APIInstaces.Inference,
																	elevatedState().APIInstaces.Inference.inference,
																	elevatedState, setElevatedState, setInferenceResponse, setInference)
	const fetchInferenceStatus = useFetch(elevatedState().APIInstaces.Inference,
																				elevatedState().APIInstaces.Inference.inferenceStatus,
																				elevatedState, setElevatedState, setInferenceResponse, setUpdateProgress)


	useEffect(() => {
    document.title = pageTitles["inference"]
  }, [])

	useEffect(() => {
		if(!inference) return;

		const inferenceRequestParams: InferenceRequest = {
      shiftUUID: elevatedState().shiftUUID,
			usePTM: elevatedState().frontEndSettings.usePTM,
			training: elevatedState().frontEndSettings.trainingShift,
			prebuiltShiftModel: elevatedState().prebuiltShiftModel
    };
    const inferenceBody: InferenceOperationRequest = {
      body: inferenceRequestParams
    }

    fetchInference(inferenceBody)

		setUpdating(true);
	}, [inference]);

	useEffect(() => {
		if(!inferenceResponse) return;

		setElevatedState((prev) => ({...prev, msg: inferenceResponse.msg!}));
	}, [inferenceResponse]);

	useInterval(async () => {
		if(updateProgress) return;

		if(updating || !stopInference){
			const inferenceStatusRequestParams: InferenceRequest = {
				shiftUUID: elevatedState().shiftUUID,
				usePTM: elevatedState().frontEndSettings.usePTM,
				training: elevatedState().frontEndSettings.trainingShift,
				prebuiltShiftModel: elevatedState().prebuiltShiftModel
			};
			const inferenceStatusBody: InferenceStatusRequest = {
				body: inferenceStatusRequestParams
			}
	
			await fetchInferenceStatus(inferenceStatusBody)

			if(inferenceResponse == null){
				return;
			}

			if(inferenceResponse.mediaFilename!){
				setInferenceMedia(await urlToFile(`/api/inference/content/${inferenceResponse.mediaFilename!}`,
													inferenceResponse.mediaFilename!))
				setBaseMediaString(`/api/inference/content/${inferenceResponse.baseMediaFilename!}`)
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
		<Container className="d-flex justify-content-center h-100 flex-column" key={`${inferenceMedia?.name}${baseMediaString}`}>
			<Row className="mb-2">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" mediaSrc={inferenceMedia} mediaType="media"/>
			</Row>
			<Row className="justify-content-center">
				<h1>&#x2191;</h1>
			</Row>
			<Row className="my-3">
				<Media setElevatedState={setElevatedState} className="neumorphic borderRadius-3 p-2 my-2 w-100" srcString={baseMediaString} mediaType="media"/>
			</Row>
			{updating ? <Row className="justify-content-center"><Loader/></Row> : <></>}
			<Row className="my-2">
				{elevatedState().frontEndSettings.trainingShift &&
				<Col className="px-2">
					<Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 w-100" disabled={inference}>
							&#x2190; Train More
						</Button>
          </Link>
				</Col>}
				<Col className="px-2">
					<a href={inferenceMedia ? URL.createObjectURL(inferenceMedia) : ""} download>
						<Button className="borderRadius-2 p-2 w-100" disabled={inference}>
							Download
						</Button>
					</a>
				</Col>
				{elevatedState().frontEndSettings.trainingShift &&
				<Col className="px-2">
					<Button className="borderRadius-2 p-2 w-100" disabled={inference}>
						Share <FontAwesomeIcon icon={faShare}/>
					</Button>
				</Col>}
			</Row>
		</Container>
	);
}