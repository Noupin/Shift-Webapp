//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';


interface IMediaList extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  elementsPerRow: number
  children: React.ReactNode
}

export const MediaList = (props: IMediaList) =>{
  const {elementsPerRow, children, ...mediaListProps} = props;
  const cssClasses = mediaListProps.className?.toString();
  const [elements, setElements] = useState(React.Children.toArray(children));

  let gridElements: React.ReactNode[][] = [[]]
  let gridRow = 0;

  for(let elementCoutner = 0; elementCoutner < elements.length; elementCoutner++){
    if(elementCoutner % elementsPerRow === 0){
      gridRow++;
      gridElements.push([]);
    }
    gridElements[gridRow].push(elements[elementCoutner])
  }


  return (
    <div {...mediaListProps} className={cssClasses}>
      {gridElements.map((row, currentIndex) => (
        <Row className="my-2 mx-0">
          {row.map(element => (<Col>{element}</Col>))}
        </Row>
      ))}
    </div>
  );
}