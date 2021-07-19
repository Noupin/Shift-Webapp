//Third Party Imports
import { FC, ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//First Party Imports
import { Media } from "../Media/Media";
import { FileDialog } from "../FileDialog/FileDialog";
import { validateFileList } from "../../Helpers/Files";
import { validMediaFileExtesnions } from "../../constants";
import { IElevatedPageState } from "../../Interfaces/PageState";
import { MediaList } from "../../Components/MediaList/MediaList";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { IElevatedStateProps } from "../../Interfaces/ElevatedStateProps";


interface ILoadMediaComponent extends IElevatedStateProps{
  baseMedia: File | undefined
  setBaseMedia: React.Dispatch<React.SetStateAction<File | undefined>>
  baseFiles: File[]
  setBaseFiles: React.Dispatch<React.SetStateAction<File[]>>
  maskFiles: File[]
  setMaskFiles: React.Dispatch<React.SetStateAction<File[]>>
}


function checkFile(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<IElevatedPageState>>, setFiles: React.Dispatch<React.SetStateAction<File[]>>){
  const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

  if(badExtensions.length > 0){
    setState((prev) => ({...prev,
      msg: badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`}))
  }

  setFiles((current) => [...current, ...filteredFiles])
}


export const LoadMediaComponent: FC<ILoadMediaComponent> = ({elevatedState, setElevatedState,
  baseMedia, setBaseMedia, baseFiles, setBaseFiles, maskFiles, setMaskFiles}): ReactElement => {

  let loadMediaComponent = (
    <>
      <Row>
        <Col className="mr-2">
          <Row className="justify-content-center p-1">
            <h3>Base Face</h3>
          </Row>
          <Row>
            <Col className="neumorphic borderRadius-2 p-0">
              <Row className="m-0">
                <Col xs={9}></Col>
                <Col xs={3}>
                  <div style={{display: "flex"}} className="justify-content-end">
                    <FileDialog id="baseMediaUpload"
                    onFileInput={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                  </div>
                </Col>
              </Row>
              {baseMedia ? 
              <Media setElevatedState={setElevatedState} className="borderRadius-3 p-2
                     object-fit-contain" key={!baseMedia ? "": baseMedia.name}
                     onDragOver={(event: React.DragEvent<HTMLDivElement>) => allowDrop(event)}
                     mediaSrc={baseMedia!} mediaType="video/mp4" droppable={true}/>
              :
              <FileDialog id="baseMediaUpload" className="mb-4 loadFileDialogText"
              style={{width: "100%", height: "auto"}}
              onFileInput={(event: React.ChangeEvent<HTMLInputElement>) => {
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
              }}>
                <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: "8vh"}}/>
              </FileDialog>}
            </Col>
          </Row>
        </Col>
        <Col className="ml-2">
          <Row className="justify-content-center p-1">
            <h3>Mask Face</h3>
          </Row>
          <Row>
            <Col className="neumorphic borderRadius-2 p-0">
              <Row className="m-0">
                <Col xs={9}></Col>
                <Col xs={3}>
                  <div style={{display: "flex"}} className="justify-content-end">
                    <FileDialog id="maskMediaUpload" onFileInput={(event) => {
                      const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                      if(badExtensions.length > 0){
                        setElevatedState((prev) => ({...prev,
                          msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
                      }
                      if(filteredFiles.length === 0){
                        setMaskFiles([])
                      }
                      else{
                        setMaskFiles([filteredFiles[0]])
                      }
                    }}>&#x21c6;</FileDialog>
                  </div>
                </Col>
              </Row>
              {maskFiles.length > 0 ?
              <Media setElevatedState={setElevatedState} className="borderRadius-3 p-2
                     object-fit-contain"
                     key={!maskFiles[0] ? "": maskFiles[0].name}
                     onDragOver={(event: React.DragEvent<HTMLDivElement>) => allowDrop(event)}
                     mediaSrc={maskFiles[0]!} mediaType="video/mp4" droppable={true}/>
              :
              <FileDialog id="maskMediaUpload" className="mb-4"
              style={{width: "100%", height: "auto"}}
              onFileInput={(event) => {
                const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                if(badExtensions.length > 0){
                  setElevatedState((prev) => ({...prev,
                    msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
                }
                if(filteredFiles.length === 0){
                  setMaskFiles([])
                }
                else{
                  setMaskFiles([filteredFiles[0]])
                }
              }}>
                <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: "8vh"}}/>
              </FileDialog>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )

  ///////////////////////////////////////
  // If the user is training the Shift //
  ///////////////////////////////////////
  if(elevatedState().frontEndSettings.trainingShift){
    loadMediaComponent = (
      <>
        <h4>Base Face</h4>
        <Row>
          <Col xs={2}></Col>
          <Col xs={8} className="neumorphic borderRadius-2">
            <Row className="px-4">
              <Col xs={9}></Col>
              <Col xs={3}>
                <div style={{display: "flex"}} className="justify-content-end">
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
                </div>
              </Col>
            </Row>
            {baseMedia ? 
              <Media setElevatedState={setElevatedState} className="borderRadius-3 p-2
                     object-fit-contain w-100" key={!baseMedia ? "": baseMedia.name}
                     onDragOver={(event: React.DragEvent<HTMLDivElement>) => allowDrop(event)}
                     mediaSrc={baseMedia!} mediaType="video/mp4" droppable={true}/>
              :
              <FileDialog id="baseMediaUpload" className="mb-4"
              style={{width: "100%", height: "auto"}}
              onFileInput={(event: React.ChangeEvent<HTMLInputElement>) => {
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
              }}>
                <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: "8vh"}}/>
              </FileDialog>}
          </Col>
          <Col xs={2}></Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h4>Extra Base Faces</h4>
            <div className="neumorphic borderRadius-2">
              <Row className="px-4">
                <Col xs={9}></Col>
                <Col xs={3}>
                  <div style={{display: "flex"}} className="justify-content-end">
                    <FileDialog className="justify-content-end" id="baseFileUpload" mutipleSelect={true}
                      onFileInput={(event) => checkFile(event, setElevatedState, setBaseFiles)}>
                      &#43;
                    </FileDialog>
                  </div>
                </Col>
              </Row>
              {baseFiles.length > 0 ?
              <MediaList className="mt-2 pb-1" onDragOver={(event) => allowDrop(event)}
                onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])}
                elementsPerRow={2} key={baseFiles.length} mediaArray={baseFiles} setMediaArray={setBaseFiles}
                setElevatedState={setElevatedState}/>
              :
              <FileDialog id="baseFileUpload" mutipleSelect={true} className="mb-4"
              style={{width: "100%", height: "auto"}}
              onFileInput={(event) => checkFile(event, setElevatedState, setBaseFiles)}>
                <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: "8vh"}}/>
              </FileDialog>
              }
            </div>
          </Col>
          <Col>
            <h4>Mask Face</h4>
            <div className="neumorphic borderRadius-2">
              <Row className="px-4">
                <Col xs={9}></Col>
                <Col xs={3}>
                  <div style={{display: "flex"}} className="justify-content-end">
                    <FileDialog className="justify-content-end" id="maskFileUpload" mutipleSelect={true}
                      onFileInput={(event) => checkFile(event, setElevatedState, setMaskFiles)}>
                      &#43;
                    </FileDialog>
                  </div>
                </Col>
              </Row>
              {maskFiles.length > 0 ?
              <MediaList className="mt-2 pb-1" onDragOver={(event) => allowDrop(event)}
                onDrop={(event) => setBaseFiles([...maskFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])}
                elementsPerRow={2} key={maskFiles.length} mediaArray={maskFiles} setMediaArray={setMaskFiles}
                setElevatedState={setElevatedState}/>
              :
              <FileDialog id="maskFileUpload" mutipleSelect={true} className="mb-4"
              style={{width: "100%", height: "auto"}}
              onFileInput={(event) => checkFile(event, setElevatedState, setMaskFiles)}>
                <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: "8vh"}}/>
              </FileDialog>
              }
            </div>
          </Col>
        </Row>
      </>
    );
  }

  return loadMediaComponent
}