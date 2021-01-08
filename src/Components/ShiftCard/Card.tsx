//Third Party Imports
import React from 'react';

//First Party Imports
import "./Card.scss"


interface IShiftCard extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  image: File
  title: string
  gradientStart: string
  gradientEnd: string
  onClick?: () => void
}


export function Card(props: IShiftCard){
  const {image, title, gradientStart, gradientEnd, onClick, ...cardProps} = props;
  const cssClasses = cardProps.className?.toString() + " neuPress neuHover neumorphic";
  const buttonStyle = {background: `linear-gradient(${gradientStart}, ${gradientEnd}, transparent), url(${URL.createObjectURL(image)}) no-repeat`,
                       cursor: 'pointer', border: 'none'};

  return (
    <button {...cardProps} className={cssClasses} onClick={onClick} style={buttonStyle}>
      {title}
    </button>
  );
}