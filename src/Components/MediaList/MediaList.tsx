/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { IElevatedPageState } from '../../Interfaces/PageState';
import { Button } from '../Button/Button';
import { Media } from '../Media/Media';


interface IMediaList extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  elementsPerRow: number
  mediaArray: File[] | null
  setMediaArray: React.Dispatch<React.SetStateAction<File[]>> | null
  children?: React.ReactNode | null
}

export function MediaList(props: IMediaList){
  const {setElevatedState, elementsPerRow, mediaArray, setMediaArray, children, ...mediaListProps} = props;
  const cssClasses = mediaListProps.className?.toString();
  var elements: (React.ReactChild | React.ReactFragment | React.ReactPortal)[] = [];
  let gridElements: React.ReactNode[][] = [];
  let gridRow = -1;
  const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(
                                          {position: 'absolute',
                                           top: "50%",
                                           left: "50%",
                                           transform: "translate(-50%, -50%)",
                                           width: "60%",
                                           height: "60%",
                                           border: "none",
                                           display: "none",
                                           fontSize: "25px",
                                           fontWeight: 'bolder'});

  function showDeleteButton(){
    setButtonStyle((prev) => ({...prev, display: 'flex'}));
  }

  function hideDeleteButton(){
    setButtonStyle((prev) => ({...prev, display: 'none'}));
  }
  
  function removeElement(itemList: File[], setItemList: React.Dispatch<React.SetStateAction<File[]>>, deleteIndex: number){
    setItemList(itemList.filter((item, index: number) => index !== deleteIndex))
  }


  if(mediaArray){
    elements = React.Children.toArray(
      mediaArray.map((file) => (
        <Media key={mediaArray.indexOf(file)} setElevatedState={setElevatedState} mediaSrc={file} mediaType="video/mp4"/>
      ))
    );
  }
  else{
    elements = React.Children.toArray(children);
  }

  for(let elementCounter = 0; elementCounter < elements.length; elementCounter++){
    if(elementCounter % elementsPerRow === 0){
      gridRow++;
      gridElements = [...gridElements, []];
    }
    gridElements[gridRow] = [...gridElements[gridRow], elements[elementCounter]]
  }


  return (
    <div {...mediaListProps} className={cssClasses}>
      {gridElements.map((row, rowIndex) => (
        <Row className="my-2 mx-0" key={rowIndex}>
          {row.map((element, colIndex) => (
            <Col className="align-middle relative" key={row.indexOf(element)}
                 onMouseEnter={() => showDeleteButton()}
                 onMouseLeave={() => hideDeleteButton()}>
              {element}
              <Button style={buttonStyle} className="glassmorphic borderRadius-2 justify-content-center" onClick={() => removeElement(mediaArray!, setMediaArray!, (rowIndex*elementsPerRow)+colIndex)}>&#x2715;</Button>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}