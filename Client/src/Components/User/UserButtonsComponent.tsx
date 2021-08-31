/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Col, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '@noupin/feryv-components';
import { FERYV_OAUTH_URL } from '@noupin/feryv-oauth-hooks';


interface IUserButtons{
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}


export const UserButtonComponent: FC<IUserButtons> = ({setDeleting}): ReactElement => {
  let userButtonComponent = (
    <Row>
      <Col>
        <a href={`${FERYV_OAUTH_URL}/account/?editing=true`} className="w-100">
          <Button className="borderRadius-2 p-2 mt-2 w-100">
            Edit
          </Button>
        </a>
      </Col>
      <Col>
        <Button className="borderRadius-2 p-2 mt-2 w-100 text-danger" onClick={() => setDeleting(true)}>
          Delete
        </Button>
      </Col>
    </Row>
  )

  return userButtonComponent
}