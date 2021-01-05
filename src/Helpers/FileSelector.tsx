//Third Party Imports
import React from 'react';

export function buildFileDialog(){
  const fileDialog = document.createElement('input');
  fileDialog.setAttribute('type', 'file');
  fileDialog.setAttribute('multiple', 'multiple');
  return fileDialog;
}

function fileListToList(fileList: FileList){
  let files: File[] = []
  for (var fileIndex = 0; fileIndex < fileList.length; fileIndex++){
    files.push(fileList[fileIndex]);
  }

  return files
}

export function openFileDialog(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>, files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>){
  const fileDialog = buildFileDialog();
  event.preventDefault();
  fileDialog.click();
  fileDialog.onchange = (ev) => {setFiles([...files, ...fileListToList(fileDialog.files!)])}
}