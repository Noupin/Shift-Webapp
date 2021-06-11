/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Col, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';


interface IShiftButtons{
  editing: boolean
  deleteShift: () => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
}


export const ShiftButtonsComponent: FC<IShiftButtons> = ({editing, setEditing, setSaving, deleteShift}): ReactElement => {
  let shiftButtonsComponent = (
    <Row>
      <Col>
        <Button className="borderRadius-2 p-2 w-100 mx-2" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </Col>
      <Col>
        <Button className="borderRadius-2 p-2 text-danger w-100 mx-2"
                onClick={deleteShift}>
          Delete
        </Button>
      </Col>
    </Row>
  )

  if (editing){
    shiftButtonsComponent = (
      <Row>
        <Col>
          <Button className="borderRadius-2 p-2 w-100 mx-2"
          onClick={() => {
            setEditing(false);
            setSaving(true)
          }}>
            Save
          </Button>
        </Col>
        <Col>
          <Button className="borderRadius-2 p-2 w-100 mx-2 text-danger"
          onClick={() => {
            setEditing(false);
          }}>
            Cancel
          </Button>
        </Col>
      </Row>
    )
  }

  return shiftButtonsComponent
}