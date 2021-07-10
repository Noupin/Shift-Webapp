import { User } from "../Swagger";

export function getCookie(name: string){
  const fullName = `${name}=`;
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');

  let res: string = "";
  cArr.forEach(val => {
      if (val.indexOf(fullName) === 0) res = val.substring(fullName.length);
  })

  return res;
}

export function setCookie(name: string, value: string, expDays?: number){
  if(expDays){
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }
  else{
    document.cookie = `${name}=${value}; path=/`;
  }
}

export function deleteCookie(name: string){
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function currentUser(): User{
  const encodedUser = getCookie("user")
  const decodedUser = atob(encodedUser)
  const user: User = JSON.parse(decodedUser)

  return user
}

export function setCurrentUser(value: any, expDays?: number){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = btoa(jsonStrValue)

  setCookie("user", encodedValue, expDays)
}
