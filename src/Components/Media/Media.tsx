//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { Image } from '../Image/Image';
import { Video } from '../Video/Video';
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';

interface IMedia extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  mediaSrc: string
  mediaType?: string
}

const videoTypes: string[] = ['mp4', 'webm', 'ogg']

export const Media = (props: IMedia) => {
  const {mediaSrc, mediaType, ...mediaProps} = props;
  const cssClasses = mediaProps.className?.toString();

  let element: JSX.Element
  const [mediaSrcState, setMediaSrcState] = useState(mediaSrc);

  if (videoTypes.indexOf(mediaSrcState.split('.').pop()!) !== -1){
    element = <Video onDragOver={(event) => allowDrop(event)} onDrop={(event) => setMediaSrcState(dropFiles(event)[0].name)} videoSrc={mediaSrcState} videoType={mediaType!}/>;
  }
  else{
    element = <Image onDragOver={(event) => allowDrop(event)} onDrop={(event) => setMediaSrcState(dropFiles(event)[0].name)} imageSrc={mediaSrcState}/>
  }

  return (
    <div {...mediaProps} className={cssClasses}>
      {element}
    </div>
  );
}
