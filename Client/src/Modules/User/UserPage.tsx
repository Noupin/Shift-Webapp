/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import { pageTitles } from '../../constants';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift,
  UserShiftsResponse} from '../../Swagger';
import { UserComponent } from '../../Components/User/UserComponent';
import { currentUser } from '../../Helpers/User';


export function UserPage (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

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
          <UserComponent username={username} elevatedState={elevatedState} setElevatedState={setElevatedState}/>
        </Col>
        <Col xs={9} className="p-2">
          {username === currentUser().username &&
          <Row className="justify-content-end">
            <NavLink to="/settings" className="textColor" style={{fontSize: "1.5em"}}>
              <FontAwesomeIcon icon={faCog}/>
            </NavLink>
          </Row>}
          <Row className="justify-content-center">
            <h2>Shifts</h2>
          </Row>
          <Row className="pl-3">
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
          </Row>
        </Col>
      </Row>
    </Container>
  );
}