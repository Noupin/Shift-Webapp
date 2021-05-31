//Third Party Imports
import React from 'react';

//First Party Imports
import { IElevatedPageState } from '../../Interfaces/PageState';
import "./HorizontalScrollMenu.scss"


interface IHorizontalScrollMenu extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
  children?: React.ReactNode | null
}


export function HorizontalScrollMenu(props: IHorizontalScrollMenu){
  const {children, setElevatedState, ...scrollMenuProps} = props;
  scrollMenuProps.className = scrollMenuProps.className?.toString() + " scrollMenu borderRadius-3 p-2";

  const elements = React.Children.toArray(children)

  return (
    <div {...scrollMenuProps}>
      {elements.map((element) => (
        element
      ))}
    </div>
  );
}