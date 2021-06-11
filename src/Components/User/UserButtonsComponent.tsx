/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Col, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';


interface IUserButtons{
  editing: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
}


export const UserButtonComponent: FC<IUserButtons> = ({editing, setEditing, setSaving}): ReactElement => {
  let userButtonComponent = (
    <Row>
      <Col>
        <Button className="borderRadius-2 p-2 mt-2 w-100" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </Col>
      <Col>
        <Button className="borderRadius-2 p-2 mt-2 w-100 text-danger">
          Delete
        </Button>
      </Col>
    </Row>
  )

  if (editing){
    userButtonComponent = (
      <Row>
        <Col>
          <Button className="borderRadius-2 p-2 mt-2 w-100"
          onClick={() => {
            setEditing(false)
            setSaving(true)
          }}>
            Save
          </Button>
        </Col>
        <Col>
          <Button className="borderRadius-2 p-2 mt-2 w-100 text-danger"
          onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </Col>
      </Row>
    )
  }

  return userButtonComponent
}