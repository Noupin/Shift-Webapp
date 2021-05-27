//Third Party Imports
import React from 'react';

//First Party Imports
import { Media } from '../Media/Media'
import { IElevatedPageState } from '../../Interfaces/PageState';
import { Button } from '../Button/Button';
import { videoTypes } from '../../constants';
import "./ShiftCard.scss"
import { Shift } from '../../Swagger';


interface IShiftCard extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  shift: Shift
  onClick?: () => void
}


export function ShiftCard(props: IShiftCard){
  const {shift, onClick, setElevatedState, ...cardProps} = props;
  const cssClasses = cardProps.className?.toString() + " neuPress neuHover neumorphic";
  const buttonStyle: React.CSSProperties = {objectFit: 'contain', border: 'none'};
  const apiPrefix = videoTypes.indexOf(shift.imagePath!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'

  return (
    <Button {...cardProps} className={cssClasses} onClick={onClick} style={buttonStyle}>
      <h2>{shift.title}</h2>
      <Media srcString={`${apiPrefix}${shift.imagePath}`} setElevatedState={setElevatedState} className="borderRadius-2"></Media>
    </Button>
  );
}