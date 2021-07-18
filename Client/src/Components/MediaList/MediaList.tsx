/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

//Frist Party Imports
import { Button } from '../Button/Button';
import { Media } from '../Media/Media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './MediaList.scss';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface IMediaList extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  elementsPerRow: number
  mediaArray: File[] | null
  setMediaArray: React.Dispatch<React.SetStateAction<File[]>> | null
  children?: React.ReactNode | null
}


export function MediaList(props: IMediaList){
  const {setElevatedState, elementsPerRow, mediaArray, setMediaArray, children, ...mediaListProps} = props;
  const cssClasses = mediaListProps.className?.toString();
  var elements: (React.ReactChild | React.ReactFragment | React.ReactPortal)[] = [];

  if(mediaArray){
    elements = React.Children.toArray(
      mediaArray.map((file, index) => (
        <Media className="borderRadius-1" key={index} setElevatedState={setElevatedState}
               mediaSrc={file} mediaType="video/mp4"/>
      ))
    );
  }
  else{
    elements = React.Children.toArray(children);
  }

  const [deleteButtonVisible, setDeleteButtonVisible] = useState(Array(elements.length).fill(false));
  
  function removeElement(itemList: File[], setItemList: React.Dispatch<React.SetStateAction<File[]>>, deleteIndex: number){
    setItemList(itemList.filter((item, index: number) => index !== deleteIndex))
  }

  useEffect(() => {
    setDeleteButtonVisible(deleteButtonVisible);
  }, [deleteButtonVisible])


  return (
    <div {...mediaListProps} className={cssClasses}>
      <Masonry breakpointCols={{default: elementsPerRow,
                                1400: elementsPerRow > 3 ? 3 : elementsPerRow,
                                1100: elementsPerRow > 2 ? 2 : elementsPerRow,
                                800: elementsPerRow > 1 ? 1 : elementsPerRow}}
               className="my-masonry-grid"
               columnClassName="my-masonry-grid_column">
        {elements.map((element, index) => (
          <div key={index} className="masonryImageElement relative align-middle hoverButton">
            {element}
            <Button className="glassmorphic borderRadius-2 justify-content-center align-items-center"
                    onClick={() => removeElement(mediaArray!, setMediaArray!, index)}>
              <FontAwesomeIcon style={{minHeight: "100%", minWidth: "100%"}} icon={faTimes}/>
            </Button>
          </div>
        ))}
      </Masonry>
    </div>
  );
}