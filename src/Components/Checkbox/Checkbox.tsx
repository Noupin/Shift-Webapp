//Third Party Imports
import React from 'react';

//First Party Imports
import './Checkbox.scss';


export interface ICheckbox{
    onChange?: () => void,
    checked: boolean
}

export const Checkbox = (props: ICheckbox) => {
    return(
        <label>
            <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
            <div className="checkbox"></div>
        </label>
    );
}