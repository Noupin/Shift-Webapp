//Third Party Imports
import React from 'react';

//First Party Imports
import './Image.scss';

interface IImage extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  imageSrc: string
}

export const Image = (props: IImage) => {
  const {imageSrc, ...imageProps} = props;
  const cssClasses = imageProps.className?.toString() + " img-fluid";

  return(
    <img {...imageProps} className={cssClasses} src={imageSrc} alt=""/>
  );
}
