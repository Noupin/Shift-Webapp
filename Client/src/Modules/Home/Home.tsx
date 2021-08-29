/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { StickySidebar, HorizontalScrollMenu } from "@noupin/feryv-components";
import { CATEGORIES_TO_REMOVE, pageTitles } from '../../constants';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import { ShiftCategories } from '../../Interfaces/ShiftCategories';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { CategoriesRequest, CategoriesResponse, CategoryRequest, NewShiftsResponse,
  PopularShiftsResponse, Shift, ShiftCategoryResponse } from '../../Swagger';
import { useFetch } from '../../Hooks/Fetch';


export function Home (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  let [categoryNames, setCategoryNames] =  useState<CategoriesResponse["categories"]>([])

  const [featuredShifts, setFeaturedShifts] = useState<Shift[]>([])
  const [popularShifts, setPopularShifts] = useState<Shift[]>([])
  const [newShifts, setNewShifts] = useState<Shift[]>([])
  const [shiftCategories, setShiftCategories] = useState<ShiftCategories[]>([])
  const defaultCategories = ["Featured", "Popular", "New"]

  const fetchNewCategory = useFetch()({
    thisArg: elevatedState.APIInstances.Category,
    swaggerFunction: elevatedState.APIInstances.Category._new,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: (newResponse: NewShiftsResponse) => setNewShifts(newResponse.shifts!)
  })
  const fetchPopularCategory = useFetch()({
    thisArg: elevatedState.APIInstances.Category,
    swaggerFunction: elevatedState.APIInstances.Category.popular,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: (popularResponse: PopularShiftsResponse) => setPopularShifts(popularResponse.shifts!)
  })
  const fetchFeaturedCategory = useFetch()({
    thisArg: elevatedState.APIInstances.Category,
    swaggerFunction: elevatedState.APIInstances.Category.category,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: (featuredResponse: ShiftCategoryResponse) => setFeaturedShifts(featuredResponse.shifts!)
  })
  const fetchCategory = useFetch()({
    thisArg: elevatedState.APIInstances.Category,
    swaggerFunction: elevatedState.APIInstances.Category.category,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: (categoryResponse: ShiftCategoryResponse, category: string) =>{
      let categoryShifts: ShiftCategories = {
        category: category,
        shifts: categoryResponse.shifts!
      }
      setShiftCategories((prev) => [...prev, categoryShifts])
    }
  })
  const fetchCategories = useFetch()({
    thisArg: elevatedState.APIInstances.Category,
    swaggerFunction: elevatedState.APIInstances.Category.categories,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: (categoriesResponse: CategoriesResponse) => {
      setCategoryNames(categoriesResponse.categories.filter(
        (category: string) => CATEGORIES_TO_REMOVE.indexOf(category) === -1
      ))
    }
  })


  useEffect(() => {
    if(!elevatedState.APIInstances.apiKey) return;
    document.title = pageTitles["home"]
  }, [])

  useEffect(() => {
    fetchNewCategory()
    fetchPopularCategory()
  
    const featuredParms: CategoryRequest = {
      page: 1,
      categoryName: 'featured'
    }
    fetchFeaturedCategory(featuredParms)

    async function getCategoryNames(){
      const categoriesParams: CategoriesRequest = {
        page: 1
      }
      await fetchCategories(categoriesParams)
    }
    
    getCategoryNames()
  }, [])

  useEffect(() => {
    if(categoryNames.length === 0) return;

    async function getShifts(){
      categoryNames.forEach(async (category) => {
        const categoryParams: CategoryRequest = {
          categoryName: category,
          page: 1
        }
        await fetchCategory(categoryParams, category)
      })
    }
    
    getShifts();
  }, [categoryNames])


  return (
    <div style={{position: "relative"}} className="h-100 mt-2">
      <StickySidebar items={[...defaultCategories, ...shiftCategories.map((item) => item.category)]}/>
      <Container className="wideScreen">

        <Row className="justify-content-center">
          <h1>Shift</h1>
        </Row>

        <Row id="featured">
          <h3>Featured</h3>
        </Row>
        <Row>
          <HorizontalScrollMenu style={{height: 250}}>
            {featuredShifts.map((element, index) => (
              <ShiftCard key={`featured${index}`} shift={element} setElevatedState={setElevatedState}
                imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
            ))}
          </HorizontalScrollMenu>
        </Row>

        <Row id="popular">
          <h3>Popular</h3>
        </Row>
        <Row>
          <HorizontalScrollMenu style={{height: 250}}>
            {popularShifts.map((element, index) => (
              <ShiftCard key={`popular${index}`} shift={element} setElevatedState={setElevatedState}
                imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
            ))}
          </HorizontalScrollMenu>
        </Row>

        <Row id="new">
          <h3>New</h3>
        </Row>
        <Row>
          <HorizontalScrollMenu style={{height: 250}}>
            {newShifts.map((element, index) => (
              <ShiftCard key={`new${index}`} shift={element} setElevatedState={setElevatedState}
                imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
            ))}
          </HorizontalScrollMenu>
        </Row>

        {shiftCategories.map((category) => (
          <>
            <Row id={category.category}>
              {category.category ? <h3>{category.category}</h3> : <></>}
            </Row>
            <Row>
              {category.shifts!.length > 0 ?
              <HorizontalScrollMenu style={{height: 250}}>
                {category.shifts!.map((element, index) => (
                  <ShiftCard key={`${category.category}${index}`} shift={element} setElevatedState={setElevatedState}
                    imageCssClassNames="widthResponsiveMedia object-fit-contain"/>
                ))}
              </HorizontalScrollMenu> : <></>}
            </Row>
          </>
        ))}
      </Container>
    </div>
  );
}