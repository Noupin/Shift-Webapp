/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { CATEGORIES_TO_GET, CATEGORIES_TO_REMOVE, pageTitles } from '../constants';
import { CategoryAPIInstance } from '../Helpers/Api';
import { ShiftCard } from '../Components/ShiftCard/ShiftCard';
import { ShiftCategories } from '../Interfaces/ShiftCategories';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { HorizontalScrollMenu } from '../Components/HorizontalScrollMenu/HorizontalScrollMenu';
import { CategoriesRequest, CategoriesResponse, CategoryRequest, Shift, ShiftCategoryResponse } from '../Swagger';


export function Home (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])

  async function getCategoryShifts(categoryName: string="Featured"): Promise<ShiftCategoryResponse>{
    const categoryParams: CategoryRequest = {
      categoryName: categoryName
    }

    const categoryResponse = await CategoryAPIInstance.category(categoryParams)
    
    return categoryResponse;
  }


  useEffect(() => {
    document.title = pageTitles["home"]
  }, [])

  useEffect(() => {
    CategoryAPIInstance.popular().then((value) => setPopularShifts(value.shifts!))
  }, [])

  useEffect(() => {
    CategoryAPIInstance._new().then((value) => setNewShifts(value.shifts!))
  }, [])

  useEffect(() => {
    async function featuredShifts(){
      const featuredResponse = await getCategoryShifts();
      setFeaturedShifts(featuredResponse.shifts!)
    }
    
    featuredShifts();
  }, [])

  useEffect(() => {
    async function getCategories(maximum=CATEGORIES_TO_GET): Promise<CategoriesResponse["categories"]>{
      let categoryNames: CategoriesResponse["categories"] = [];

      const categoriesParams: CategoriesRequest = {
        maximum: maximum
      }

      const categoriesResponse = await CategoryAPIInstance.categories(categoriesParams);
      categoryNames = categoriesResponse.categories.filter(
        (category: string) => CATEGORIES_TO_REMOVE.indexOf(category) === -1
      )
      console.log(categoryNames)

      return categoryNames
    }

    async function getShifts(){
      const categoryNames = await getCategories()

      categoryNames.forEach(async (category) => {
        const categoryResponse = await getCategoryShifts(category);
        let categoryShifts: ShiftCategories = {
          category: category,
          shifts: categoryResponse.shifts!
        }

        setShiftCategories((prev) => [...prev, categoryShifts])
      })
    }
    
    getShifts();
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