import { Avatar } from "@material-ui/core";
import React,{useState} from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../store/Actions/user";
import { updateProfile } from "../../utils/users";
import "./SettingsForm.css";
export default function SettingsForm({open,setOpen}) {
  
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState({
    email:user.email,
    name:user.name,
    surname:user.surname,
    imgUrl:user.imgUrl,
    profileCover:"",
    country:user.country,
    city:user.city,
    about:user.about
  })

  const dispatch = useDispatch()
  const setProfile = (e,data) => {
    console.log(data,"the data that should be updated")
    e.preventDefault()
    dispatch(changeProfile(data))
    setOpen(false)
  }
  const onChangeHandler = (e) => {
    let profileDetails = {...state}
    let currentId = e.currentTarget.id
    if(currentId === "avatar"){
      profileDetails[currentId] = e.target.files[0]
    } else {
      profileDetails[currentId] = e.currentTarget.value
    }
    setState(profileDetails)
  }
  return (
    <div>
      <h3>Profile</h3>
      <p className="text-muted">
        This information will be shared publicly so be careful what you share.
      </p>
      <hr />
      <Form>
        <Row>
          <Col>About</Col>
          <Col>
            <Form.Control as="textarea" type="text" id="about" value={state.about} onChange={onChangeHandler} rows={3} />
            <Form.Text className="text-muted">
              Write something about yourself.
            </Form.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Photo</Col>
          <Col className="change-avatar-button">
            <input accept="image/png, image/jpeg, image/jpg"
                type="file"
                id="avatar"
                onChange={onChangeHandler} /> <Button>Change</Button>{" "}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Cover photo</Col>
          <Col>
            <input type="file" />
          </Col>
        </Row>
        <hr />
        <h3>Personal information</h3>
        <p className="text-muted">Use a valid e-mail address.</p>
        <hr />
        <Row>
          <Col>First Name</Col>
          <Col>
            <Form.Control  type="text" id="name" value={state.name} onChange={onChangeHandler} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Last Name</Col>
          <Col>
            <Form.Control  type="text" id="surname" value={state.surname} onChange={onChangeHandler} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>E-mail</Col>
          <Col>
            <Form.Control  type="email" id="email" value={state.email} onChange={onChangeHandler} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Country / Region</Col>
          <Col>
            <Form.Control  type="text" id="country" value={state.country} onChange={onChangeHandler} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>City</Col>
          <Col>
            <Form.Control  type="text" id="city" value={state.city} onChange={onChangeHandler} />
          </Col>
        </Row>
        <hr />
        <Button onClick={(e) => setProfile(e,state)} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
