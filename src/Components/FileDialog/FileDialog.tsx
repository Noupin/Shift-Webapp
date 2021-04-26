//Third Party Imports
import React from 'react';

//First Party Imports
import './FileDialog.scss';


interface IFileDialog extends React.HTMLAttributes<HTMLElement>{
  mutipleSelect?: boolean
  id: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}


export const FileDialog = (props: IFileDialog) => {
  const {mutipleSelect, id, onChange, children, ...fileDialogProps} = props;
  const cssClasses = fileDialogProps.className?.toString();

  let inputElement = <input type="file" id={id} onChange={onChange}/>
  if(mutipleSelect){
    inputElement = <input type="file" id={id} multiple onChange={onChange}/>
  }
  
  return (
    <>
      {inputElement}
      <label {...fileDialogProps} className={cssClasses} htmlFor={id}>{children}</label>
    </>
  );
}