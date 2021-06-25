//Third Party Imports
import React from 'react';
import { ReactElement } from 'react';

//First Party Imports
import { IElevatedPageState } from '../../Interfaces/PageState';
import "./HorizontalMasonry.scss"


interface IHorizontalMasonry extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  children?: ReactElement[] | null
}


export function HorizontalMasonry(props: IHorizontalMasonry){
  const {children, setElevatedState, ...masonryProps} = props;
  masonryProps.className = masonryProps.className?.toString() + " h-masonry";

  return (
    <div {...masonryProps}>
      {children ? React.Children.map(children, child => (
        <figure className="h-masonry-brick">
          {React.cloneElement(child, { className: child.props.className! + " h-100"})}
        </figure>
      )) :
      <></>}
    </div>
  );
}