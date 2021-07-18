//Third Party Imports
import React, { ReactElement } from 'react';

//First Party Imports
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import "./HorizontalMasonry.scss"


interface IHorizontalMasonry extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  children?: ReactElement[] | null
}


export function HorizontalMasonry(props: IHorizontalMasonry){
  const {children, setElevatedState, ...masonryProps} = props;
  masonryProps.className = masonryProps.className?.toString() + " h-masonry";

  return (
    <div {...masonryProps}>
      {children ? React.Children.map(children, child => (
        <figure className="h-masonry-brick">
          {React.cloneElement(child, { className: child.props.className! + " h-100 w-100"})}
        </figure>
      )) :
      <></>}
    </div>
  );
}