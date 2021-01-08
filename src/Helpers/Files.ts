export function fileListToList(fileList: FileList){
  let files: File[] = []
  for (var fileIndex = 0; fileIndex < fileList.length; fileIndex++){
    files.push(fileList[fileIndex]);
  }

  return files
}
