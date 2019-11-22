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
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    zip:'',
    institution: '',

  }

   handleSubmit = (e) => {
     e.preventDefault();
     const {donorName,email,phone,address,state,city,zip,institution}  = this.state;
     const {createDonor} = this.props;
    createDonor(donorName,email,phone,address,state,city,zip,institution);
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
                   placeholder="Name" 
                />
              </FormGroup>
                  
              <br></br>
              <FormGroup  bsSize="large">
                <FormControl
                    onChange = {(e) => this.setState({ email: e.target.value})}
                    placeholder="Email" 
                />
              </FormGroup>
              <br></br>
              <FormGroup  bsSize="large">
                <FormControl
                  placeholder="Phone"
                  onChange = {(e) => this.setState({ phone: e.target.value})}
                />
              </FormGroup>
              <br></br>
              <FormGroup bsSize="large">
                <FormControl
                  placeholder="Address"
                  onChange = {(e) => this.setState({ address: e.target.value})}
                />
              </FormGroup>
              <br></br>
              <Row>
                <Col>
                  <Form.Control 
                  placeholder="City"
                  onChange = {(e) => this.setState({ city: e.target.value})}
                   />
                </Col>
                <Col>
                  <Form.Control 
                  placeholder="State" 
                  onChange = {(e) => this.setState({ state: e.target.value})}
                  />
                </Col>
                <Col>
                  <Form.Control 
                  placeholder="Zip"
                  onChange = {(e) => this.setState({ zip: e.target.value})}
                   />
                </Col>
              </Row>
              <br></br>

              <FormGroup bsSize="large">
                <FormControl
                  placeholder="Institution"
                  onChange = {(e) => this.setState({ institution: e.target.value})}                />
              </FormGroup>
              <br></br> 
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