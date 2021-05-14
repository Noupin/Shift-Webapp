/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { FileDialog } from "../../Components/FileDialog/FileDialog"
import { validMediaFileExtesnions, defaultShiftTitle } from "../../constants";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { validateFileList } from '../../Helpers/Files';
import { fillArray } from "../../Helpers/Arrays";
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IElevatedPageState } from '../../Interfaces/PageState';
import { TextBox } from '../../Components/TextBox/TextBox';


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
}

function checkFile(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<IElevatedPageState>>, setFiles: React.Dispatch<React.SetStateAction<File[]>>){
  const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

  if(badExtensions.length > 0){
    setState((prev) => ({...prev,
      msg: badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`}))
  }

  setFiles((current) => [...current, ...filteredFiles])
}

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = [];


export function Load (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [prevTitleIsFilename, setPrevTitleIsFilename] = useState(false);
  const [title, setTitle] = useState(defaultShiftTitle);
  const [updateTitle, setUpdateTitle] = useState(true);
  const [titleUpdated, setTitleUpdated] = useState(false);

  const [trainingDataTypes, setTrainingDataTypes] = useState(ListOfDataType);
  const [files, setFiles] = useState(ListOfFiles);
  const [baseFiles, setBaseFiles] = useState(ListOfFiles);
  const [maskFiles, setMaskFiles] = useState(ListOfFiles);
  const [baseMedia, setBaseMedia] = useState<File>();

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<loadRequestReturn>();

  const prevShiftUUID = sessionStorage["shiftUUID"];
  const requestOptions = useRef<RequestInit>({})
  const requestHeaders = new Headers();


  const fetchLoad = useFetch(setFetching, setElevatedState, setLoadResponse, `/api/loadData`, () => requestOptions.current, loadResponse)

  
  useEffect(() => {
    setElevatedState((prev) => ({...prev, prebuiltShiftModel: "", shiftTitle: defaultShiftTitle}))
  }, []);

  useEffect(() => {
    if(!fetching) return;

    if(!baseMedia){
      setElevatedState((prev) => ({...prev, msg: "Make sure you have a priamry base media"}))
      setFetching(false);
      return;
    }

    const data = new FormData();
    requestOptions.current = {
      method: 'POST',
      headers: {},
      credentials: "include",
    };

    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      data.append(`file${fileIndex}`, files[fileIndex]);
    }

    requestOptions.current.body = data;

    requestHeaders.append('trainingDataTypes', JSON.stringify(trainingDataTypes));
    requestOptions.current.headers = requestHeaders;
    setElevatedState((prev) => ({...prev, shiftTitle: title}))
  
    fetchLoad()
  }, [fetching]);

  useEffect(() => {
    if(!loadResponse) return;

    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse!.shiftUUID}))
    setElevatedState((prev) => ({...prev, msg: loadResponse!.msg}));
  }, [loadResponse]);

  useEffect(() => {
    if(!elevatedState().shiftUUID || elevatedState().shiftUUID === prevShiftUUID) return;

    history.push(`/${elevatedState().defaultTrainView === "basic" ? "train" : "advancedTrain"}`);
  }, [elevatedState().shiftUUID]);

  useEffect(() => {
    if(!baseMedia) return;

    setFiles([baseMedia, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1), ...fillArray("mask", maskFiles.length)])
  }, [baseMedia, baseFiles, maskFiles]);


  useEffect(() => {
    if(!baseMedia) return;

    if(title === defaultShiftTitle || (title !== baseMedia.name.split('.')[0] && updateTitle) || prevTitleIsFilename){
      setTitle(baseMedia.name.split('.')[0]);
      setTitleUpdated(true)
      setUpdateTitle(false)
      setPrevTitleIsFilename(true);
    }

  }, [baseMedia, updateTitle, prevTitleIsFilename]);


  var titleBar = (
    <Col xs={6}>
      <TextBox className="borderRadius-2 m-2 w-100 p-2" type="text" placeholder="Title"
               onChange={(event) => {
                setTitle(event.target.value)
                setTitleUpdated(false)
                setUpdateTitle(false)
                setPrevTitleIsFilename(false)}}
               value={title}/>
    </Col>
  );
  if(!titleUpdated && baseMedia && ((title !== defaultShiftTitle) || (title !== baseMedia!.name.split('.')[0]))){
    titleBar = (
      <>
        <Col xs={5}>
          <TextBox className="borderRadius-2 my-2 w-100 py-2" type="text" placeholder="Title"
                    onChange={(event) => {
                      setTitle(event.target.value)
                      setTitleUpdated(false)
                      setUpdateTitle(false)
                      setPrevTitleIsFilename(false)}}
                    value={title} autoFocus/>
        </Col>
        <Col xs={1}>
          <Button className="borderRadius-2 my-2 py-2 align-items-center"
                  onClick={() => setUpdateTitle(true)}>&#x21bb;</Button>
        </Col>
      </>
    );
  }


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="mb-2">
        <Col xs={3}></Col>
        {titleBar}
        <Col xs={3}></Col>
      </Row>
      <h4>Base Face</h4>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="neumorphic borderRadius-2">
          <Row className="px-4">
            <Col xs={11}></Col>
            <Col xs={1}>
              <FileDialog className="justify-content-end" id="baseMediaUpload" onChange={(event) => {
                const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                if(badExtensions.length > 0){
                  setElevatedState((prev) => ({...prev, msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
                }
                if(filteredFiles.length === 0){
                  setBaseMedia(undefined)
                }
                else{
                  setBaseMedia(filteredFiles[0])
                }
              }}>&#x21c6;</FileDialog>
            </Col>
          </Row>
          <Media setElevatedState={setElevatedState} className="borderRadius-3 p-2 object-fit-contain" key={!baseMedia ? "": baseMedia.name} onDragOver={(event: React.DragEvent<HTMLDivElement>) => allowDrop(event)}
                 mediaSrc={baseMedia!} mediaType="video/mp4" droppable={true}/>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Extra Base Faces</h4>
          <div className="neumorphic borderRadius-2">
            <Row className="px-4">
              <Col xs={11}></Col>
              <Col xs={1} >
                <FileDialog className="justify-content-end" id="baseFileUpload" mutipleSelect={true} onChange={(event) => checkFile(event, setElevatedState, setBaseFiles)}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 pb-1" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])}
                       elementsPerRow={2} key={baseFiles.length} mediaArray={baseFiles} setMediaArray={setBaseFiles}
                       setElevatedState={setElevatedState}>
            </MediaList>
          </div>
        </Col>
        <Col xs>
          <h4>Mask Face</h4>
          <div className="neumorphic borderRadius-2">
            <Row className="px-4">
              <Col xs={11}></Col>
              <Col xs={1} >
                <FileDialog className="justify-content-end" id="maskFileUpload" mutipleSelect={true} onChange={(event) => checkFile(event, setElevatedState, setMaskFiles)}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 pb-1" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMaskFiles([...maskFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])}
                       elementsPerRow={2} key={maskFiles.length} mediaArray={maskFiles} setMediaArray={setMaskFiles}
                       setElevatedState={setElevatedState}>
            </MediaList>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={2}></Col>
        <Col xs={8}>
          <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" disabled={fetching} onClick={() => setFetching(true)}>Load</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}