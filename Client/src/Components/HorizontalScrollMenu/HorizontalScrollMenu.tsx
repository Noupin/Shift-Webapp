//Third Party Imports
import React, { ReactElement } from 'react';

//First Party Imports
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import "./HorizontalScrollMenu.scss"


interface IHorizontalScrollMenu extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  children?: ReactElement[] | null
}


export function HorizontalScrollMenu(props: IHorizontalScrollMenu){
  const {children, setElevatedState, ...scrollMenuProps} = props;
  scrollMenuProps.className = scrollMenuProps.className?.toString() + " horizontalScrollMenu borderRadius-3 p-2";

  return (
    <div {...scrollMenuProps}>
      {children ? React.Children.map(children, child => (
        <>
          {React.cloneElement(child, { className: child.props.className! + " h-100 mx-2"})}
        </>
      )) :
      <></>}
    </div>
  );
}