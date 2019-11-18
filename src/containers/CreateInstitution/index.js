import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import FormControl from "react-bootstrap/FormControl";

export default function Institution(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "48rem" }}>
        <Card.Header as="h5">Create Institution</Card.Header>
        <Card.Body>
          <div className="Login">
            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Control placeholder="Institution Name" />
                </Col>
              </Row>
              <br></br>
                <Row>
                <Col>
                  <Form.Control placeholder="Address" />
                </Col>
                </Row>
                <br></br>
              <Row>
                <Col>
                  <Form.Control placeholder="City" />
                </Col>
                <Col>
                  <Form.Control placeholder="State" />
                </Col>
                <Col>
                  <Form.Control placeholder="Zip" />
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Button
                block
                bsSize="large"
                disabled={validateForm()}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
