//Third Party Imports
import React from 'react';
import { useHistory } from 'react-router';

//First Party Imports
import { Media } from '../Media/Media'
import { Button } from '../Button/Button';
import { videoTypes } from '../../constants';
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
  const cssClasses = cardProps.className?.toString() + " borderRadius-2 p-0 forceTextWrap p-2";
  const buttonStyle: React.CSSProperties = { border: 'none'};
  const apiPrefix = videoTypes.indexOf(shift.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'
  
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
        <p className={`lighterGlassmorphic position-absolute
          m-0 ${mediaBorderRaduis} px-2`}
          style={{bottom: 0, left: 0, textAlign: "center", fontSize: 26, maxWidth: "100%"}}>
          {shift.title}
        </p>
        <Media srcString={`${apiPrefix}${shift.mediaFilename}`}
          className={imageCssClass}
          setElevatedState={setElevatedState}/>
      </div>
    </Button>
  );
}