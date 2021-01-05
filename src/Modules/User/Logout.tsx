//Third Party Imports
import React from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { IElevatedPageState } from "../../Interfaces/PageState";


export const Logout = (props: IElevatedPageState) => {

  const logoutUser = () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
    };

    fetch(`/api/users/logout`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
      props.setMsg(data.msg);
    });
  }

  return (
    <Container>
      <Row>
        <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" onClick={logoutUser}>Logout</Button>
      </Row>
    </Container>
  );
}