//Third Party Imports
import React from 'react';

//First Party Imports
import './Button.scss';

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  children: React.ReactNode
  onClick?: (event?: any) => void
}

export const Button = (props: IButton) => {
  const {children, onClick, ...buttonProps} = props;
  const cssClasses = buttonProps.className?.toString() + " neuPress neuHover neumorphic";

  return(
    <button {...buttonProps} className={cssClasses} onClick={onClick}>{children}</button>
  );
}