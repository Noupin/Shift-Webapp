//Third Party Imports
import { v4 as uuidv4 } from 'uuid';


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

export async function urlToFile(url: string, filename=uuidv4()): Promise<File | undefined>{
  var fileOptions: FilePropertyBag  = {}
  const returnFile = await fetch(url).then(res => {
    if(res.headers.get("Content-Type")) fileOptions['type'] = res.headers.get("Content-Type")!
    return res.blob()
  }).then(blob => {
    return new File([blob], filename, fileOptions)
  }).catch((error) => console.error(error))

  if(!returnFile) return undefined;
  else return returnFile!
}
