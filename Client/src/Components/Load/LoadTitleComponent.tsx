/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { FC, ReactElement, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

//First Party Imports
import { Button, TextBox } from "@noupin/feryv-components";
import { IElevatedStateProps } from "../../Interfaces/ElevatedStateProps";
import { defaultShiftTitle } from "../../constants";


interface ILoadMediaComponent extends IElevatedStateProps{
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  baseMedia: File | undefined
}


export const LoadTitleComponent: FC<ILoadMediaComponent> = ({elevatedState, title, setTitle,
  baseMedia}): ReactElement => {
  const [prevTitleIsFilename, setPrevTitleIsFilename] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(true);
  const [titleReset, setTitleReset] = useState(false);

  var titleComponent = <></>

  useEffect(() => {
    if(!baseMedia) return;

    if(title === defaultShiftTitle ||
      (title !== baseMedia.name.split('.')[0] && updateTitle) || prevTitleIsFilename){
      setTitle(baseMedia.name.split('.')[0]);
      setTitleReset(true)
      setUpdateTitle(false)
      setPrevTitleIsFilename(true);
    }

  }, [baseMedia, updateTitle, prevTitleIsFilename]);


  function onTitleChange(event:React.ChangeEvent<HTMLInputElement>){
    setTitle(event.target.value)
    setTitleReset(false)
    setUpdateTitle(false)
    setPrevTitleIsFilename(false)
  }

  var titleBar = (
    <Col xs={6}>
      <TextBox className="borderRadius-2 m-2 w-100 p-2" type="text" placeholder="My Shift"
                onChange={onTitleChange} value={title}/>
    </Col>
  );
  if(!titleReset && baseMedia && ((title !== defaultShiftTitle)
      || (title !== baseMedia!.name.split('.')[0]))){
    titleBar = (
      <>
        <Col xs={5}>
          <TextBox className="borderRadius-2 my-2 w-100 py-2" type="text" placeholder="My Shift"
                    onChange={onTitleChange} autoFocus value={title}/>
        </Col>
        <Col xs={1}>
          <Button className="borderRadius-2 my-2 py-2 align-items-center"
                  onClick={() => setUpdateTitle(true)}>&#x21bb;</Button>
        </Col>
      </>
    );
  }

  if(elevatedState.frontEndSettings.trainingShift){
    titleComponent = (
      <Row className="mb-2">
        <Col xs={3}></Col>
          {titleBar}
        <Col xs={3}></Col>
      </Row>
    )
  }

  return titleComponent
}