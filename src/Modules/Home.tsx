/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { ShiftCategoryAPIInstance } from '../Helpers/Api';

//First Party Imports
import { CategoryRequest, Shift } from '../Swagger';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { ShiftCategories } from '../Interfaces/ShiftCategories';
import { HorizontalScrollMenu } from '../Components/ScrollMenu/HorizontalScrollMenu';
import { ShiftCard } from '../Components/ShiftCard/ShiftCard';


export function Home (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])

  useEffect(() => {
    ShiftCategoryAPIInstance.popular().then((value) => setPopularShifts(value.shifts!))
  }, [])

  useEffect(() => {
    ShiftCategoryAPIInstance._new().then((value) => setNewShifts(value.shifts!))
  }, [])

  useEffect(() => {
    const categoryParams: CategoryRequest = {
      category: "featured"
    }

    ShiftCategoryAPIInstance.category(categoryParams).then((value) => setFeaturedShifts(value.shifts!))
  }, [])

  useEffect(() => {
    const categoryParams: CategoryRequest = {
      category: "marvel"
    }

    let categoryResponse: ShiftCategories = {category: "", shifts: []};

    ShiftCategoryAPIInstance.category(categoryParams).then((value) => {
      categoryResponse = {
        category: categoryParams.category,
        shifts: value.shifts!
      }
    })

    setShiftCategories((prev) => [...prev, categoryResponse])
  }, [])

  return (
    <>
      <h1>Shift</h1>

      <h4>Featured</h4>
      <HorizontalScrollMenu setElevatedState={setElevatedState}>
        {featuredShifts.map((element, index) => (
          <ShiftCard className="mx-2" key={index} shift={element} setElevatedState={setElevatedState}/>
        ))}
      </HorizontalScrollMenu>

      <h4>Popular</h4>
      <HorizontalScrollMenu setElevatedState={setElevatedState}>
        {popularShifts.map((element, index) => (
          <ShiftCard className="mx-2" key={index} shift={element} setElevatedState={setElevatedState}/>
        ))}
      </HorizontalScrollMenu>

      <h4>New</h4>
      <HorizontalScrollMenu setElevatedState={setElevatedState}>
        {newShifts.map((element, index) => (
          <ShiftCard className="mx-2" key={index} shift={element} setElevatedState={setElevatedState}/>
        ))}
      </HorizontalScrollMenu>

      {shiftCategories.map((category) => (
        <>
          {category.category ? <h4>{category.category}</h4> : <></>}
          {category.shifts!.length > 0 ? <HorizontalScrollMenu setElevatedState={setElevatedState}>
            {category.shifts!.map((element, index) => (
              <ShiftCard className="mx-2" key={index} shift={element} setElevatedState={setElevatedState}/>
            ))}
          </HorizontalScrollMenu> : <></>}
        </>
      ))}
    </>
  );
}