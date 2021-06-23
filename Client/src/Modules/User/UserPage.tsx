/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Masonry from 'react-masonry-css';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import { pageTitles } from '../../constants';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift,
  UserShiftsResponse} from '../../Swagger';
import { UserComponent } from '../../Components/User/UserComponent';


export function UserPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();

  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [userShifts, setUserShifts] = useState<Shift[]>([]);


  useEffect(() => {
    document.title = pageTitles["user"](username)
  }, [])


  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username
    }

    UserAPIInstance.userShifts(urlParams).then((value) => {
      setUserShiftsResponse(value!)
    })
  }, [username]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);


  return (
    <Container key={username}>
      <Row>
        <Col xs={3}>
          <UserComponent username={username} setElevatedState={setElevatedState}/>
        </Col>
        <Col xs={9} className="p-2">
          <Masonry breakpointCols={{default: 4,
                                    1400: 3,
                                    1100: 2,
                                    800: 1}}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
            {userShifts!.map((element, index) => (
              <ShiftCard key={index} className="m-2 p-2" shift={element} setElevatedState={setElevatedState}/>
            ))}
          </Masonry>
        </Col>
      </Row>
    </Container>
  );
}