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
  const cssClasses = videoProps.className?.toString() + ' embed-responsive';
  console.log(videoType)

  return(
    <video {...videoProps} className={cssClasses} key={videoSrc} controls>
      <source src={videoSrc} type={videoType}/>
      Your browser does not support the video tag.
    </video>
  );
}