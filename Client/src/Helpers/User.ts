import { User } from "../Swagger";

export function currentUser(): User{
  const encodedUser = localStorage.getItem("user")!
  const decodedUser = atob(encodedUser)
  const user: User = JSON.parse(decodedUser)

  return user
}

export function setCurrentUser(value: any, expDays?: number){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = btoa(jsonStrValue)

  localStorage.setItem("user", encodedValue)
}
