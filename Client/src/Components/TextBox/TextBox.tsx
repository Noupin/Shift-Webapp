//Third Party Imports
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

//First Party Imports
import './TextBox.scss';

export interface ITextBox extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  type: string
  placeholder: string
}

export const TextBox = (props: ITextBox) => {
  const {onBlur, type, placeholder, ...textboxProps} = props;
  const cssClasses = textboxProps.className?.toString() + " textbox";

  const [hidden, setHidden] = useState(true);

  return type === "password" ?
    (<div className="w-100" style={{position: "relative"}}>
      <input {...textboxProps} className={cssClasses}
             type={hidden ? type : "text"} placeholder={placeholder} onBlur={onBlur}/>
      <FontAwesomeIcon style={{position: "absolute", top: "20px", right: "15px"}}
        icon={hidden ? faEye: faEyeSlash} onClick={() => setHidden(!hidden)}/>
    </div>) :
    (<input {...textboxProps} className={cssClasses}
            type={type} placeholder={placeholder} onBlur={onBlur}/>)
}