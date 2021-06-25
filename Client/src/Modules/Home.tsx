/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ShiftCategoryAPIInstance } from '../Helpers/Api';

//First Party Imports
import { CategoryRequest, Shift } from '../Swagger';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { ShiftCategories } from '../Interfaces/ShiftCategories';
import { ShiftCard } from '../Components/ShiftCard/ShiftCard';
import { pageTitles } from '../constants';
import { HorizontalMasonry } from '../Components/Masonry/HorizontalMasonry'
import { HorizontalScrollMenu } from '../Components/HorizontalScrollMenu/HorizontalScrollMenu';


export function Home (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])


  useEffect(() => {
    document.title = pageTitles["home"]
  }, [])

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
    <Container className="fullScreen">
      <Row className="justify-content-center">
        <h1>Shift</h1>
      </Row>

      <Row>
        <h3>Featured</h3>
      </Row>
      <Row>
        <HorizontalScrollMenu setElevatedState={setElevatedState} style={{height: 250}}>
          {featuredShifts.map((element, index) => (
            <ShiftCard key={index} shift={element} setElevatedState={setElevatedState}
              imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
          ))}
        </HorizontalScrollMenu>
      </Row>

      <Row>
        <h3>Popular</h3>
      </Row>
      <Row>
        <HorizontalScrollMenu setElevatedState={setElevatedState} style={{height: 250}}>
          {popularShifts.map((element, index) => (
            <ShiftCard key={index} shift={element} setElevatedState={setElevatedState}
              imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
          ))}
        </HorizontalScrollMenu>
      </Row>

      <Row>
        <h3>New</h3>
      </Row>
      <Row>
        <HorizontalScrollMenu setElevatedState={setElevatedState} style={{height: 250}}>
          {newShifts.map((element, index) => (
            <ShiftCard key={index} shift={element} setElevatedState={setElevatedState}
              imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
          ))}
        </HorizontalScrollMenu>
      </Row>

      {shiftCategories.map((category) => (
        <>
          <Row>
            {category.category ? <h3>{category.category}</h3> : <></>}
          </Row>
          <Row>
            {category.shifts!.length > 0 ?
            <HorizontalScrollMenu setElevatedState={setElevatedState} style={{height: 250}}>
              {category.shifts!.map((element, index) => (
                <ShiftCard key={index} shift={element} setElevatedState={setElevatedState}
                  imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
              ))}
            </HorizontalScrollMenu> : <></>}
          </Row>
        </>
      ))}
    </Container>
  );
}