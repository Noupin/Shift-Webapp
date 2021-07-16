//First Party Import
import { User } from "../Swagger";
import { DEFAULT_USER } from '../constants'


export function currentUser(): User{
  const encodedUser = localStorage.getItem("user")!
  if(!encodedUser) return DEFAULT_USER

  const decodedUser = atob(encodedUser)

  if(decodedUser === JSON.stringify({}) || decodedUser === "undefined") return DEFAULT_USER
  try{
    const user: User = JSON.parse(decodedUser)
    if(!user) return DEFAULT_USER

    return user
  }
  catch{
    return DEFAULT_USER
  }
}

export function setCurrentUser(value: any){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = btoa(jsonStrValue)

  localStorage.setItem("user", encodedValue)
}
