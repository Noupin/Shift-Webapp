
export function fileListToList(fileList: FileList){
  let files: File[] = []
  for (var fileIndex = 0; fileIndex < fileList.length; fileIndex++){
    files.push(fileList[fileIndex]);
  }

  return files
}


export function validateFileList(files: FileList, extensionList: string[]): [File[], string[]]{
  let validFiles: File[] = []
  let badExtensions: string[] = []

  for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
    const extension = files[fileIndex].name.split('.').pop()!.toLowerCase()

    if(!extensionList.includes(extension)){
      badExtensions.push(extension)
      continue
    }

    validFiles.push(files[fileIndex]);
  }

  return [validFiles, badExtensions]
}