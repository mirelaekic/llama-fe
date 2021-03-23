import { Avatar } from "@material-ui/core";
import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./SettingsForm.css";
export default function SettingsForm() {
  return (
    <div>
      <h3>Profile</h3>
      <p className="text-muted">
        This information will be shared publicly so be careful what you share.
      </p>
      <hr />
      <Form>
          <Row>
              <Col>
              About 
              </Col>
              <Col>
              <Form.Control as="textarea" rows={3} />
              <Form.Text className="text-muted">
      Write something about yourself.
    </Form.Text>
              </Col>
          </Row>
          <hr />
          <Row >
              <Col>Photo</Col>
              <Col className="change-avatar-button"><Avatar /> <Button>Change</Button> </Col>
          </Row>
          <hr />
          <Row>
          <Col>Cover photo</Col>
          <Col><input type="file" /></Col>
          </Row>
          <hr />
          <h3>Personal information</h3>
      <p className="text-muted">
        Use a valid e-mail address.
      </p>
      <hr />
      <Row>
          <Col>First Name</Col>
          <Col><Form.Control type="text" /></Col>
      </Row>
      <hr />
      <Row>
          <Col>Last Name</Col>
          <Col><Form.Control type="text" /></Col>
      </Row>
      <hr />
      <Row>
          <Col>E-mail</Col>
          <Col><Form.Control type="email" /></Col>
      </Row>
      <hr />
      <Row>
          <Col>Country / Region</Col>
          <Col><Form.Control type="text" /></Col>
      </Row>
      <hr />
      <Row>
          <Col>City</Col>
          <Col><Form.Control type="text" /></Col>
      </Row>
      <hr />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
