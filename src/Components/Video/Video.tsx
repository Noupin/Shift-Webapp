//Third Party Imports
import React from 'react';

//First Party Imports
import './Video.scss';

interface IVideo extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>{
  videoSrc: string
  videoType: string
}

export const Video = (props: IVideo) => {
  const {videoSrc, videoType, ...videoProps} = props;
  const cssClasses = videoProps.className?.toString() + ' borderRadius-2 embed-responsive';

  return(
    <video {...videoProps} className={cssClasses} key={videoSrc} controls>
      <source src={videoSrc} type={videoType}/>
      Your browser does not suppoer the video tag.
    </video>
  );
}