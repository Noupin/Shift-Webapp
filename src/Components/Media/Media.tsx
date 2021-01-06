//Third Party Imports
import React, { useState } from 'react';

//First Party Imports
import { Image } from '../Image/Image';
import { Video } from '../Video/Video';
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';

interface IMedia extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  mediaSrc: File
  mediaType?: string
  droppable?: boolean
}

const videoTypes: string[] = ['mp4', 'webm', 'ogg']

export const Media = (props: IMedia) => {
  const {mediaSrc, mediaType, droppable, ...mediaProps} = props;
  const cssClasses = mediaProps.className?.toString();

  let element: JSX.Element
  const [mediaSrcState, setMediaSrcState] = useState(mediaSrc);
  const mediaSrcString = URL.createObjectURL(mediaSrcState);

  if (videoTypes.indexOf(mediaSrcState.name.split('.').pop()!) !== -1){
    if(droppable){
      element = <Video onDragOver={(event) => allowDrop(event)} onDrop={(event) => setMediaSrcState(dropFiles(event)[0])} videoSrc={mediaSrcString} videoType={mediaType!}/>;
    }
    else{
      element = <Video videoSrc={mediaSrcString} videoType={mediaType!}/>;
    }
  }
  else{
    if(droppable){
      element = <Image onDragOver={(event) => allowDrop(event)} onDrop={(event) => setMediaSrcState(dropFiles(event)[0])} imageSrc={mediaSrcString}/>
    }
    else{
      element = <Image imageSrc={mediaSrcString}/>
    }
  }

  return (
    <div {...mediaProps} className={cssClasses}>
      {element}
    </div>
  );
}
