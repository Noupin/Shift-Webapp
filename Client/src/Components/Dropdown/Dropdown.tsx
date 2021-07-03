//Third Party Imports
import React from 'react';



export interface IDropdown extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
  onChange?: () => void,
  options: string[]
}

export const Dropdown = (props: IDropdown) => {
  const {onChange, options, ...dropdownProps} = props;
  const cssClasses = dropdownProps.className?.toString();

  return(
    <select {...dropdownProps} className={cssClasses}>
      {options.map(option => (
        <option>{option}</option>
      ))}
    </select>
  );
}