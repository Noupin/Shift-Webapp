//Third Party Imports
import React from 'react';

export const fillArray = (value: any, amount: number) => {
  let arr = [];
  for(let index = 0; index < amount; index++){
    arr.push(value);
  }

  return arr
}