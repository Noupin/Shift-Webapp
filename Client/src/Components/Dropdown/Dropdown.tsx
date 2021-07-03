//Third Party Imports
import React from 'react';



export interface IDropdown extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
  options: string[]
  defaultOption: string
}

export const Dropdown = (props: IDropdown) => {
  const {options, defaultOption, ...dropdownProps} = props;
  const cssClasses = dropdownProps.className?.toString() + " neumorphic p-2 borderRadius-1";

  return(
    <select {...dropdownProps} className={cssClasses}>
      {options.map(option => {
        return option === defaultOption ?
        <option selected>{option}</option> :
        <option>{option}</option>
      })}
    </select>
  );
}