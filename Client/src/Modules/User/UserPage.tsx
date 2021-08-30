/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useParams } from 'react-router-dom';

//First Party Imports
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import { pageTitles } from '../../constants';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift,
  UserShiftsResponse} from '../../Swagger';
import { UserComponent } from '../../Components/User/UserComponent';
import { useFetch } from '../../Hooks/Fetch';


export function UserPage (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();

  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [userShifts, setUserShifts] = useState<Shift[]>([]);
  const [owner, setOwner] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const fetchUserShifts = useFetch()({
    thisArg: elevatedState.APIInstances.User,
    swaggerFunction: elevatedState.APIInstances.User.userShifts,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setUserShiftsResponse
  })


  function handleScroll(e: any){
    console.log('scrollelele')
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("At the bottom")
    }
  }


  useEffect(() => {
    document.title = pageTitles["user"](username)
  }, [])


  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username,
      page: pageNumber
    }

    fetchUserShifts(urlParams)
  }, [username, pageNumber]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);


  return (
    <Container key={username}>
      <Row>
        <Col xs={3} key={elevatedState.authenticated.toString()}>
          <UserComponent username={username} elevatedState={elevatedState}
            setElevatedState={setElevatedState} setOwner={setOwner}/>
        </Col>
        <Col xs={9} className="p-2" key={elevatedState.accessToken}>
          <Row className="justify-content-center">
            <h2>Shifts</h2>
          </Row>
          <Row className="pl-3" onScroll={handleScroll} style={{overflowY: 'scroll'}}>
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