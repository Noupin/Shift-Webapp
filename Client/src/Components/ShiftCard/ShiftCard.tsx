//Third Party Imports
import React from 'react';
import { useHistory } from 'react-router-dom';

//First Party Imports
import { getCDNPrefix } from '@noupin/feryv-cdn-helpers';
import { Media, Button } from "@noupin/feryv-components";
import "./ShiftCard.scss"
import { Shift } from '../../Swagger';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface IShiftCard extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  shift: Shift
  imageCssClassNames?: string
}


export function ShiftCard(props: IShiftCard){
  const {shift, setElevatedState, imageCssClassNames, ...cardProps} = props;
  const cssClasses = cardProps.className?.toString() + " borderRadius-2 p-0 p-2";
  const buttonStyle: React.CSSProperties = { border: 'none'};
  
  const history = useHistory();

  const mediaBorderRaduis = "borderRadius-1";

  let imageCssClass = `${mediaBorderRaduis}`;
  if(imageCssClassNames){
    imageCssClass = imageCssClass + ` ${imageCssClassNames}`;
  }

  function goToShift(event: Event, uuid: string){
    event.preventDefault()
    history.push(`/shift/${uuid}`)
  }

  return (
    <Button {...cardProps} className={cssClasses} style={buttonStyle}
      onClick={(event: Event) => goToShift(event, shift.uuid)}>
      <div className="h-100" style={{position: "relative"}}>
        <p className={`glassmorphic position-absolute m-0 ${mediaBorderRaduis}
          px-2 shiftCardTitle`}
          style={{bottom: 0, left: 0, textAlign: "center", fontSize: 26}}>
          {shift.title}
        </p>
        <Media srcString={`${getCDNPrefix(shift.mediaFilename!)}${shift.mediaFilename}`}
          className={imageCssClass}
          errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
      </div>
    </Button>
  );
}