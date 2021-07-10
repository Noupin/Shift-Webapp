//Third Party Imports
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

//First Party Imports
import "./Dropdown.scss";


export interface IDropdown extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
  options: string[]
  defaultOption: string
  onOptionChange: (value: string) => void
}

export const Dropdown = (props: IDropdown) => {
  const {options, defaultOption, onOptionChange, ...dropdownProps} = props;
  const cssClasses = dropdownProps.className?.toString() + " neumorphic p-2 borderRadius-2 mb-2";
  const [open, setOpen] = useState(false)

  return(
    <div onClick={() => setOpen(prev => !prev)}>
      <div style={{position: "relative"}}>
        <p {...dropdownProps} className={cssClasses}>
          {defaultOption}
        </p>
        <FontAwesomeIcon style={{position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontSize: "1.25em"}}
          className="mr-3" icon={open ? faChevronUp : faChevronDown}/>
      </div>
      <div className="neumorphic borderRadius-2">
      {open && options.map(option => (
        <p className="dropdownOption my-1 p-2 borderRadius-2"
          onClick={() => onOptionChange(option)}>
          {option}
        </p>
      ))}
      </div>
    </div>
  );
}