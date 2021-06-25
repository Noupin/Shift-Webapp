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
  imageCssClassNames?: string
}


export function ShiftCard(props: IShiftCard){
  const {shift, setElevatedState, imageCssClassNames, ...cardProps} = props;
  const cssClasses = cardProps.className?.toString() + " borderRadius-2";
  const buttonStyle: React.CSSProperties = { border: 'none', position: "relative"};
  const apiPrefix = videoTypes.indexOf(shift.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'
  
  const history = useHistory();

  let imageCssClass = "borderRadius-1";
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
      <p className="lighterGlassmorphic w-75 position-absolute m-0 borderRadius-1 pl-2"
        style={{top: 0, left: 0, textAlign: "left", fontSize: 26}}>
        {shift.title}
      </p>
      <p className="lighterGlassmorphic w-75 position-absolute m-0 borderRadius-1 pr-2"
        style={{bottom: 0, right: 0, textAlign: "right", fontSize: 16}}>
        @{shift.author.username}
      </p>
      <Media srcString={`${apiPrefix}${shift.mediaFilename}`}
        className={imageCssClass}
        setElevatedState={setElevatedState}/>
    </Button>
  );
}