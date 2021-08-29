//First Party Import
import { DEFAULT_USER } from '../constants'
import { User } from '../Swagger'


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

export function isAuthenticated(): boolean{
  const authString = localStorage.getItem("authenticated")!
  return authString === 'true';
}

export function setAuthenticated(auth: boolean){
  const authString = `${auth}`
  localStorage.setItem("authenticated", authString)
}
