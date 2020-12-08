//Third Party Imports
import React, { useState, useEffect } from 'react';


export const Account = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' }
    };
      
    fetch(`/api/users/account`, requestOptions).then(res => res.json()).then(data => {
      setUsername(data.username);
      console.log(data);
    });
  }, []);

  return (
    <>
      <h2>{username}</h2>
      <p>Your account page.</p>
    </>
  );
}