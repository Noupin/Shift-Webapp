//Third Party Imports
import React, { useState } from 'react';

//First Party Imports
import { Image } from '../Image/Image';
import { Video } from '../Video/Video';
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { validMediaFileExtesnions, videoTypes } from '../../constants';
import { IElevatedPageState } from '../../Interfaces/PageState';

interface IMediaImage extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  mediaSrc?: File
  srcString?: string
  mediaType?: string
  droppable?: boolean
}

interface IMediaVideo extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  mediaSrc?: File
  srcString?: string
  mediaType?: string
  droppable?: boolean
}


export const Media = (props: IMediaImage | IMediaVideo) => {
  const {setElevatedState, mediaSrc, srcString, mediaType, droppable, className, ...mediaProps} = props;
  const cssClasses = className?.toString();

  let imageProps = mediaProps as IMediaImage;
  let videoProps = mediaProps as IMediaVideo;

  let element: JSX.Element
  var mediaSrcString = srcString;
  const [mediaSrcState, setMediaSrcState] = useState(mediaSrc);

  if(!mediaSrcString){
    mediaSrcString = mediaSrcState ? URL.createObjectURL(mediaSrcState) : "";
  }


  if ((mediaSrcState && videoTypes.indexOf(mediaSrcState.name.split('.').pop()!) !== -1)
      || (srcString && srcString.indexOf('video') !== -1)){
    if(droppable){
      element = <Video onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMediaSrcState(dropFiles(event, setElevatedState, validMediaFileExtesnions)[0])}
                       videoSrc={mediaSrcString} videoType={mediaType!}
                       className={cssClasses} {...videoProps}/>;
    }
    else{
      element = <Video videoSrc={mediaSrcString} videoType={mediaType!}
                       className={cssClasses} {...videoProps}/>;
    }
  }
  else{
    if(droppable){
      element = <Image onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMediaSrcState(dropFiles(event, setElevatedState, validMediaFileExtesnions)[0])}
                       imageSrc={mediaSrcString} className={cssClasses} {...imageProps}/>
    }
    else{
      element = <Image imageSrc={mediaSrcString} className={cssClasses} {...imageProps}/>
    }
  }

  return (
    <>
      {element}
    </>
  );
}
