//Third Party Imports
import React from 'react';

//First Party Imports
import './TextBox.scss';

export interface ITextBox{
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    type: string,
    placeholder: string
}

export const TextBox = (props: ITextBox) => {
    return(
        <input className="neumorphic textbox" type={props.type} placeholder={props.placeholder} onBlur={props.onBlur}/>
    );
}