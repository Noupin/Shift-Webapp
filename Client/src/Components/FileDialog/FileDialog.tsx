//Third Party Imports
import React from 'react';

//First Party Imports
import './FileDialog.scss';


interface IFileDialog extends React.HTMLAttributes<HTMLElement>{
  mutipleSelect?: boolean
  id: string
  onFileInput?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  uniqueFiles?: boolean
}


export const FileDialog = (props: IFileDialog) => {
  const {mutipleSelect, id, onFileInput, children, uniqueFiles, ...fileDialogProps} = props;
  const cssClasses = fileDialogProps.className?.toString();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>){
    if(onFileInput){
      onFileInput(event)
    }
    if(!uniqueFiles!){
      event.target.value = ""
    }
  }

  let inputElement = <input type="file" id={id} onChange={onFileChange}/>
  if(mutipleSelect){
    inputElement = <input type="file" id={id} multiple onChange={onFileChange}/>
  }
  
  return (
    <>
      {inputElement}
      <label {...fileDialogProps} className={cssClasses} htmlFor={id}>{children}</label>
    </>
  );
}