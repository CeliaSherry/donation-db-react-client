import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";


import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDonor: actions.createDonor,
  }, dispatch);
}



export class CreateDonor extends Component{
  state = {
    donorName: '',

  }

   handleSubmit = (e) => {
     e.preventDefault();
     const {donorName}  = this.state;
     const {createDonor} = this.props;

    createDonor(donorName);
  }

  
  render(){

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "48rem" }}>
        <Card.Header as="h5">Create Donor</Card.Header>
        <Card.Body>
          <div className="Login">
            <Form >
            <FormGroup bsSize="large">
                <FormControl
                   onChange = {(e) => this.setState({ donorName: e.target.value})}
                   placeholder="First name" 
                />
              </FormGroup>

              {/* <Row>
                <Col>
                  <Form.Control 
                   onChange = {(e) => this.setState({ firstName: e.target.value})}
                   placeholder="First name" />
                </Col>
                <Col>
                  <Form.Control placeholder="Last name" />
                  
                </Col>
              </Row> */}
              {/* <br></br>
              <FormGroup controlId="email" bsSize="large">
                <FormControl
                  placeholder="Email"
                  value={email}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <br></br>
              <FormGroup controlId="email" bsSize="large">
                <FormControl
                  placeholder="Phone"
                  value={email}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <br></br>
              <FormGroup controlId="address" bsSize="large">
                <FormControl
                  placeholder="Street"
                  value={email}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
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

              <FormGroup controlId="address" bsSize="large">
                <FormControl
                  placeholder="Institution"
                  value={email}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <br></br> */}
              <Button
                block
                bssize="large"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
  }
}

export default connect(null, mapDispatchToProps)(CreateDonor);