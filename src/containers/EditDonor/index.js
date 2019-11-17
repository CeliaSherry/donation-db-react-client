import React, {Component, useState} from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import * as actions from "./actions";
import FormControl from "react-bootstrap/FormControl";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDonor: actions.getDonor,
  }, dispatch);
}

export class EditDonor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      setEmail: "",
      password: "",
      setPassword: ""
    }
  }

  componentDidMount() {
    this.props.getDonor(this.props.match.params.donorId).then(response => {
      this.setState({
        data: response.payload,
      })
    })
  }



  // validateForm() {
  //   return this.email.length > 0 && this.password.length > 0;
  // }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    <div style={{display: "flex", justifyContent: "center"}}>
          <Card style={{width: "48rem"}}>
            <Card.Header as="h5">Edit Donor</Card.Header>
            <Card.Body>
              <div className="Login">
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Control placeholder= "First Name" />
                    </Col>
                    <Col>
                      <Form.Control placeholder=  {this.state.data.email != null ?
                           (this.state.id):'Last Name'}
                          />
                    </Col>
                  </Row>
                  <br></br>
                  <FormGroup controlId="email" bsSize="large">
                    <FormControl
                        placeholder={this.state.data.email != null ?
                            (this.state.data.email): 'Email'}
                        value={this.email}
                        onChange={e => this.setState({
                          email: e.target.value})}
                        type="text"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup controlId="phone" bsSize="large">
                    <FormControl
                        placeholder={this.state.data.phone != null ?
                        (this.state.data.phone): 'Phone'}
                        value={this.phone}
                        onChange={e => this.setState({
                          phone: e.target.value})}
                        type="text"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup controlId="address" bsSize="large">
                    <FormControl
                        placeholder="Street"
                        value={this.email}
                        onChange={e => this.setPassword(e.target.value)}
                        type="text"
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control placeholder="City"/>
                    </Col>
                    <Col>
                      <Form.Control placeholder="State"/>
                    </Col>
                    <Col>
                      <Form.Control placeholder="Zip"/>
                    </Col>
                  </Row>
                  <br></br>

                  <FormGroup controlId="institution" bsSize="large">
                    <FormControl
                        placeholder="Institution"
                        value={this.email}
                        onChange={e => this.setPassword(e.target.value)}
                        type="password"
                    />
                  </FormGroup>
                  <br></br>
                  <Button
                      block
                      bsSize="large"
                      // disabled={!this.validateForm()}
                      type="submit"
                  >
                    Save
                  </Button>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(EditDonor);