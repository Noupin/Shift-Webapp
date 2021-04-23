/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IElevatedPageState } from '../../Interfaces/PageState';
import { Button } from '../Button/Button';
import { Media } from '../Media/Media';


var hiddenButtonStyle: React.CSSProperties = {position: 'absolute',
                                              top: "50%",
                                              left: "50%",
                                              transform: "translate(-50%, -50%)",
                                              width: "60%",
                                              height: "60%",
                                              border: "none",
                                              fontSize: "10em",
                                              display: "none"}

var shownButtonStyle: React.CSSProperties = {position: 'absolute',
                                             top: "50%",
                                             left: "50%",
                                             transform: "translate(-50%, -50%)",
                                             width: "60%",
                                             height: "60%",
                                             border: "none",
                                             fontSize: "10rem",
                                             display: "flex",
                                             fontWeight: 'bolder'}

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

  const [deleteButtonVisible, setDeleteButtonVisible] = useState(Array(elements.length).fill(false));

  function showDeleteButton(changeIndex: number){
    setDeleteButtonVisible((prev) => prev.map((item, index) => index !== changeIndex ? item : true))
  }

  function hideDeleteButton(changeIndex: number){
    setDeleteButtonVisible((prev) => prev.map((item, index) => index !== changeIndex ? item : false))
  }
  
  function removeElement(itemList: File[], setItemList: React.Dispatch<React.SetStateAction<File[]>>, deleteIndex: number){
    setItemList(itemList.filter((item, index: number) => index !== deleteIndex))
  }

  for(let elementCounter = 0; elementCounter < elements.length; elementCounter++){
    if(elementCounter % elementsPerRow === 0){
      gridRow++;
      gridElements = [...gridElements, []];
    }
    gridElements[gridRow] = [...gridElements[gridRow], elements[elementCounter]]
  }

  useEffect(() => {
    setDeleteButtonVisible(deleteButtonVisible);
  }, [deleteButtonVisible])


  return (
    <div {...mediaListProps} className={cssClasses}>
      {gridElements.map((row, rowIndex: number) => (
        <Row className="my-2 mx-0" key={rowIndex}>
          {row.map((element, colIndex: number) => (
            <Col className="align-middle relative" key={row.indexOf(element)}
                 onMouseEnter={() => showDeleteButton((rowIndex*elementsPerRow)+colIndex)}
                 onMouseLeave={() => hideDeleteButton((rowIndex*elementsPerRow)+colIndex)}>
              {element}

              <Button style={deleteButtonVisible[(rowIndex*elementsPerRow)+colIndex] ? shownButtonStyle : hiddenButtonStyle}
                      className="glassmorphic borderRadius-2 justify-content-center align-items-center"
                      onClick={() => removeElement(mediaArray!, setMediaArray!, (rowIndex*elementsPerRow)+colIndex)}>
                        &#x2715;
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}