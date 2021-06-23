//Third Party Imports
import React from 'react';

//First Party Imports
import './Checkbox.scss';


export interface ICheckbox extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>{
  onChange?: () => void,
  checked: boolean
}

export const Checkbox = (props: ICheckbox) => {
  const {onChange, checked, ...checkboxProps} = props;
  const cssClasses = checkboxProps.className?.toString();

  return(
    <label {...checkboxProps} className={cssClasses}>
      <input type="checkbox" checked={checked} onChange={onChange}/>
      <div className="checkbox"></div>
    </label>
  );
}