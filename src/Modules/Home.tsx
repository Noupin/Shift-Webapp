//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { useFetch } from "../Hooks/Fetch";
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';


interface cardRequestReturn {
  title: string
  image: string
}


export function Account (props: IElevatedStateProps){
  const {elevatedState, setElevatedState, ...homeProps} = props;

  const [username, setUsername] = useState("");

  const [fetchingFeatured, setFetchingFeatured] = useState(true);
  const [featuredResponse, setFeaturedResponse] = useState<cardRequestReturn>()

  const [fetchingPopular, setFetchingPopular] = useState(true);
  const [popularResponse, setPopularResponse] = useState<cardRequestReturn>()

  const [fetchingNew, setFetchingNew] = useState(true);
  const [newResponse, setNewResponse] = useState<cardRequestReturn>()

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  };


  const fetchFeatured = useFetch(setFetchingFeatured, setElevatedState, setFeaturedResponse, `/api/featured`, () => requestOptions, featuredResponse)
  const fetchPopular = useFetch(setFetchingPopular, setElevatedState, setPopularResponse, `/api/popular`, () => requestOptions, popularResponse)
  const fetchNew = useFetch(setFetchingNew, setElevatedState, setNewResponse, `/api/new`, () => requestOptions, newResponse)

  useEffect(() => {
    if(!fetchingFeatured || !fetchingPopular || !fetchingNew) return;
    fetchFeatured()
    fetchPopular()
    fetchNew()
  }, []);


  return (
    <>
      <h2>{username}</h2>
      <p>Your account page.</p>
    </>
  );
}