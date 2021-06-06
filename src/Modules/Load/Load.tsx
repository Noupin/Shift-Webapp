/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { FileDialog } from "../../Components/FileDialog/FileDialog"
import { validMediaFileExtesnions, defaultShiftTitle, pageTitles } from "../../constants";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { validateFileList } from '../../Helpers/Files';
import { fillArray } from "../../Helpers/Arrays";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IElevatedPageState } from '../../Interfaces/PageState';
import { TextBox } from '../../Components/TextBox/TextBox';
import { LoadDataResponse, LoadDataRequest } from '../../Swagger';
import { LoadAPIInstance } from '../../Helpers/Api';
import { Loader } from '../../Components/Loader/Loader';
import { Checkbox } from '../../Components/Checkbox/Checkbox';


function checkFile(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<IElevatedPageState>>, setFiles: React.Dispatch<React.SetStateAction<File[]>>){
  const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

  if(badExtensions.length > 0){
    setState((prev) => ({...prev,
      msg: badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`}))
  }

  setFiles((current) => [...current, ...filteredFiles])
}


export function Load (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [prevTitleIsFilename, setPrevTitleIsFilename] = useState(false);
  const [title, setTitle] = useState(defaultShiftTitle);
  const [updateTitle, setUpdateTitle] = useState(true);
  const [titleUpdated, setTitleUpdated] = useState(false);

  const [trainingDataTypes, setTrainingDataTypes] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [baseFiles, setBaseFiles] = useState<File[]>([]);
  const [maskFiles, setMaskFiles] = useState<File[]>([]);
  const [baseMedia, setBaseMedia] = useState<File>();

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<LoadDataResponse>();

  const prevShiftUUID = sessionStorage["shiftUUID"];

  
  useEffect(() => {
    document.title = pageTitles["load"]
    setElevatedState((prev) => ({...prev, prebuiltShiftModel: "", shiftTitle: defaultShiftTitle}))
  }, []);

  //Load Request
  useEffect(() => {
    if(!fetching) return;

    if(!baseMedia){
      setElevatedState((prev) => ({...prev, msg: "Make sure you have a primary base media"}))
      setFetching(false);
      return;
    }

    let renamedFiles: Blob[] = files.map((file: File) => {
      return new File([file], `${uuidv4()}.${file.name.split('.').pop()!.toLowerCase()}`, {type: file.type})
    })

    const loadDataParams: LoadDataRequest = {
      trainingDataTypes: trainingDataTypes,
      requestFiles: renamedFiles
    }

    setElevatedState((prev) => ({...prev, shiftTitle: title}))
  
    LoadAPIInstance.loadData(loadDataParams).then((value) => {
      setLoadResponse(value)
    })
    setFetching(false)
  }, [fetching]);

  //Update values from response
  useEffect(() => {
    if(!loadResponse) return;

    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse.shiftUUID!}))
    setElevatedState((prev) => ({...prev, msg: loadResponse.msg!}));
  }, [loadResponse]);

  //Change the page from button clicks
  useEffect(() => {
    if(!elevatedState().shiftUUID || elevatedState().shiftUUID === prevShiftUUID) return;

    history.push(`/${elevatedState().defaultTrainView === "basic" ? "train" : "advancedTrain"}`);
  }, [elevatedState().shiftUUID]);

  //Update files to send
  useEffect(() => {
    if(!baseMedia) return;

    setFiles([baseMedia, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1),
                          ...fillArray("mask", maskFiles.length)])
  }, [baseMedia, baseFiles, maskFiles]);


  useEffect(() => {
    if(!baseMedia) return;

    if(title === defaultShiftTitle ||
      (title !== baseMedia.name.split('.')[0] && updateTitle)|| prevTitleIsFilename){
      setTitle(baseMedia.name.split('.')[0]);
      setTitleUpdated(true)
      setUpdateTitle(false)
      setPrevTitleIsFilename(true);
    }

  }, [baseMedia, updateTitle, prevTitleIsFilename]);


  function onTitleChange(event:React.ChangeEvent<HTMLInputElement>){
    setTitle(event.target.value)
    setTitleUpdated(false)
    setUpdateTitle(false)
    setPrevTitleIsFilename(false)
  }

  var titleBar = (
    <Col xs={6}>
      <TextBox className="borderRadius-2 m-2 w-100 p-2" type="text" placeholder="Title"
               onChange={onTitleChange}
               value={title}/>
    </Col>
  );
  if(!titleUpdated && baseMedia && ((title !== defaultShiftTitle)
     || (title !== baseMedia!.name.split('.')[0]))){
    titleBar = (
      <>
        <Col xs={5}>
          <TextBox className="borderRadius-2 my-2 w-100 py-2" type="text" placeholder="Title"
                    onChange={onTitleChange}
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
              <FileDialog className="justify-content-end" id="baseMediaUpload" onFileInput={(event) => {
                const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                if(badExtensions.length > 0){
                  setElevatedState((prev) => ({...prev,
                    msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
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
          <Media setElevatedState={setElevatedState} className="borderRadius-3 p-2 object-fit-contain"
                 key={!baseMedia ? "": baseMedia.name}
                 onDragOver={(event: React.DragEvent<HTMLDivElement>) => allowDrop(event)}
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
                <FileDialog className="justify-content-end" id="baseFileUpload" mutipleSelect={true}
                            onFileInput={(event) => checkFile(event, setElevatedState, setBaseFiles)}>
                  &#43;
                </FileDialog>
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
                <FileDialog className="justify-content-end" id="maskFileUpload" mutipleSelect={true}
                            onFileInput={(event) => checkFile(event, setElevatedState, setMaskFiles)}>
                  &#43;
                </FileDialog>
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
      {fetching ? <Row className="justify-content-center"><Loader/></Row> : <></>}
      <Row className="mt-3">
        <Col xs={10}>
          <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" disabled={fetching} onClick={() => setFetching(true)}>Load</Button>
        </Col>
        <Col xs={1} className=" justify-content-center my-auto">
          <h5 className="m-0">PTM:</h5>
        </Col>
        <Col xs={1} className="p-2">
          <Checkbox checked={elevatedState().usePTM}
            onChange={() => setElevatedState((prev) => ({...prev, usePTM: !elevatedState().usePTM}))}/>
        </Col>
      </Row>
    </Container>
  );
}