//Third Party Imports
import React from 'react';

//First Party Imports
import { IElevatedPageState } from '../Interfaces/PageState';

export const allowDrop = (event: React.DragEvent) => {
  event.preventDefault();
}

export const dropFiles = (event: React.DragEvent, props: IElevatedPageState, allowedExtenstion?: string[]) => {
  event.preventDefault();
  let files: File[] = [];
  let badExtensions: string[] = [];

  if(event.dataTransfer.files.length > 0) {
    for (var fileIndex = 0; fileIndex < event.dataTransfer.files.length; fileIndex++){
      if(allowedExtenstion && !allowedExtenstion.includes(event.dataTransfer.files[fileIndex].name.split('.').pop()!)){
        badExtensions.push(event.dataTransfer.files[fileIndex].name.split('.').pop()!)
        continue
      }
      files.push(event.dataTransfer.files[fileIndex]);
    }
    props.setMsg(badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be dropped` : `The file types ${badExtensions} are not allowed to be dropped`)
  }

  if(files.length === 0){
    files.push(new File([], ""))
  }
  
  return files;
}