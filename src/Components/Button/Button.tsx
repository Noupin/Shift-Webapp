//Third Party Imports
import React from 'react';

//First Party Imports
import './Button.scss';

export interface IButton{
    onClick?: () => void,
    children: React.ReactNode
}

export const Button = (props: IButton) => {
    return(
        <button className="neuPress neuHover neumorphic" onClick={props.onClick}>{ props.children }</button>
    );
}