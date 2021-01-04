//Third Party Imports
import React from 'react';

//First Party Imports
import './Button.scss';

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  onClick?: () => void,
  children: React.ReactNode
}

export const Button = (props: IButton) => {
  const {children, onClick, ...buttonProps} = props;
  const cssClasses = buttonProps.className?.toString() + " neuPress neuHover neumorphic";

  return(
    <button {...buttonProps} className={cssClasses} onClick={onClick}>{children}</button>
  );
}