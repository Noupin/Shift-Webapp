/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Media } from '../../Components/Media/Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualUserGetResponse } from '../../Swagger/models/IndividualUserGetResponse';
import { GetIndivdualUserRequest } from '../../Swagger';


export function UserPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();

  const [profileResponse, setProfileResponse] = useState<IndividualUserGetResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  
  
  useEffect(() => {
    const urlParams: GetIndivdualUserRequest = {
      username: username
    }

    UserAPIInstance.getIndivdualUser(urlParams).then((value) => {
      setProfileResponse(value!)
    })
  }, []);

  useEffect(() => {
    if(!profileResponse || !profileResponse.user) return;

    setProfilePictureURL(`/api/content/image/${profileResponse!.user.mediaFilename}`);
  }, [profileResponse]);


  return (
    <Container key={profilePictureURL}>
      <Row className="justify-content-center">
        <h2>{username}</h2>
      </Row>
      <Row>
        <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
      </Row>
    </Container>
  );
}