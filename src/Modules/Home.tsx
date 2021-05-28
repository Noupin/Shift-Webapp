/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import React, { useEffect } from 'react';
import { ShiftCategoryAPIInstance } from '../Helpers/Api';

//First Party Imports
import { CategoryRequest } from '../Swagger';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';


export function Home (props: IElevatedStateProps){
  //const {setElevatedState} = props;

  useEffect(() => {
    ShiftCategoryAPIInstance.popular().then((value) => console.log(value.shifts))
  }, [])

  useEffect(() => {
    ShiftCategoryAPIInstance._new().then((value) => console.log(value.shifts))
  }, [])

  useEffect(() => {
    const categoryParams: CategoryRequest = {
      category: "featured"
    }

    ShiftCategoryAPIInstance.category(categoryParams).then((value) => console.log(value.shifts))
  }, [])

  return (
    <>
      <h2>Shift</h2>
    </>
  );
}