/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IElevatedPageState } from '../../Interfaces/PageState';
import { Media } from '../Media/Media';


interface IMediaList extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  elementsPerRow: number
  mediaArray: File[] | null
  setMediaArray: React.Dispatch<React.SetStateAction<File[]>> | null
  children?: React.ReactNode | null
}

function showDeleteButton(itemList: React.ReactNode[][], row: number, col: number){
  //console.log(itemList);
  //console.log(`Row: ${row}, Col: ${col}`);
}

function removeElement(itemList: File[], setItemList: React.Dispatch<React.SetStateAction<File[]>>, deleteIndex: number){
  setItemList(itemList.filter((item, index: number) => index !== deleteIndex))
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
            <Col className="align-middle" key={row.indexOf(element)}
                 onMouseEnter={() => showDeleteButton(gridElements, rowIndex, colIndex)}
                 onMouseDown={() => removeElement(mediaArray!, setMediaArray!, (rowIndex*elementsPerRow)+colIndex)}>
              {element}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}