//Third Party Imports
import React from 'react';
import { useHistory } from 'react-router';

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
}


export function ShiftCard(props: IShiftCard){
  const {shift, setElevatedState, ...cardProps} = props;
  const cssClasses = cardProps.className?.toString() + " neuPress neuHover neumorphic borderRadius-2 forceTextWrap";
  const buttonStyle: React.CSSProperties = {objectFit: 'contain', border: 'none'};
  const apiPrefix = videoTypes.indexOf(shift.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'

  const history = useHistory();

  function goToShift(event: Event, uuid: string){
    event.preventDefault()
    history.push(`/shift/${uuid}`)
  }

  return (
    <Button {...cardProps} className={cssClasses} onClick={(event: Event) => goToShift(event, shift.uuid)} style={buttonStyle}>
      <h2>{shift.title}</h2>
      <Media srcString={`${apiPrefix}${shift.mediaFilename}`} 
        setElevatedState={setElevatedState} className="borderRadius-2">
      </Media>
      <h4>By: {shift.author.username}</h4>
    </Button>
  );
}