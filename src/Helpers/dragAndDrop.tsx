//Third Party Imports
import React from 'react';

export const allowDrop = (event: React.DragEvent) => {
  event.preventDefault();
}

export const dropFiles = (event: React.DragEvent) => {
  event.preventDefault();
  let files: File[] = [];

  if(event.dataTransfer.files.length > 0) {
    for (var fileIndex = 0; fileIndex < event.dataTransfer.files.length; fileIndex++){
      files.push(event.dataTransfer.files[fileIndex]);
      console.log(event.dataTransfer.files[fileIndex]);
    }
  }
  else {
    console.log("That data type is not allowed to be dropped");
    files.push(new File([""], ''));
  }
  
  return files;
}