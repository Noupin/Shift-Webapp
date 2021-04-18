//Third Party Imports
import React from 'react';

interface IDeletable extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children: React.ReactNode
}

function showDeleteButton(){

}

function deleteItem(){
  
}

export const Deletable = (props: IDeletable) => {
  const {children, ...deleteProps} = props;
  const cssClasses = deleteProps.className?.toString();

  return(
    <div {...deleteProps} className={cssClasses} onMouseEnter={showDeleteButton}>{children}</div>
  );
}