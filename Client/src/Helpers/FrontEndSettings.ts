//First Party Imports
import { DEFUALT_FRONT_END_SETTINGS } from "../constants"
import { IFrontEndSettings } from "../Interfaces/FrontEndSettings"


export function getFrontEndSettings(): IFrontEndSettings{
  const encodedSettings = localStorage.getItem("frontEndSettings")!
  if(!encodedSettings) return DEFUALT_FRONT_END_SETTINGS

  const decodedSettings = atob(encodedSettings)

  if(decodedSettings === JSON.stringify({}) || decodedSettings === "undefined") return DEFUALT_FRONT_END_SETTINGS
  try{
    const settings: IFrontEndSettings = JSON.parse(decodedSettings)
    if(!settings) return DEFUALT_FRONT_END_SETTINGS

    return settings
  }
  catch{
    return DEFUALT_FRONT_END_SETTINGS
  }
}

export function setFrontEndSettings(value: IFrontEndSettings){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = btoa(jsonStrValue)

  localStorage.setItem("frontEndSettings", encodedValue)
}