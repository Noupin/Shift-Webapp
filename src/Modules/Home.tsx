/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React, { useEffect } from 'react';
import { FPNAPIInstance } from '../Helpers/Api';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';


export function Home (props: IElevatedStateProps){
  //const {setElevatedState} = props;

  useEffect(() => {
    FPNAPIInstance.popular().then((value) => console.log(value.shifts))
  }, [])

  return (
    <>
      <h2>Shift</h2>
    </>
  );
}