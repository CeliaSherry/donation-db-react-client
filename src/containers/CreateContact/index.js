import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";


import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createContact: actions.createContact,
    getInstitution: actions.getInstitution,
    getAllInstitutions: actions.getAllInstitutions
  }, dispatch);
}



export class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Select Institution',
      institutionName: "",
      institutionAddress: "",
      institutionCity: "",
      institutionState: "",
      institutionZipCode: "",
      data: [],
      uniqueData: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  onlyUnique(value, index, self) { 
    if(value != null){
      return self.indexOf(value) === index;
    }
    
  }

  componentWillMount() {
    this.props.getAllInstitutions().then(response => {
   this.state.uniqueData = (response.payload.map(institution => (
     institution.institutionName != null ? institution.institutionName.toUpperCase() : institution.institutionName
   ))).filter(this.onlyUnique).sort()
  
        this.setState({
            data: response.payload
            
        })
    })
}



handleChange(event) {
  this.setState({ value: event.target.value });
  if (event.target.value != "Select Institution") {
    this.props.getInstitution(event.target.value).then(response => {
      this.setState({
        institutionName: response.payload.institutionName,
        institutionAddress: response.payload.address,
        institutionCity: response.payload.city,
        institutionState: response.payload.state,
        institutionZipCode: response.payload.zipCode
      })
    })
  }

}

  state = {
    value: 'Select Institution',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    institution: '',
    success: false,
    submitted: false,
    visible: false,

  }



  handleSubmit = (e) => {
    e.preventDefault();
    const { contactName, email, phone, address, state, city, zipCode, institutionName, institutionAddress, institutionState, institutionZipCode } = this.state;
    const { createContact } = this.props;
    createContact(contactName, email, phone, address, state, city, zipCode, institutionName, institutionAddress, institutionState, institutionZipCode).then(response => {
      this.setState({ submitted: true })
      if (response.type === 'SUCCESS') {
        this.setState({ success: true })
        
      }
      if (response.type === 'FAILURE') {
        this.setState({ success: false })
      }
      setTimeout(() => {
        this.setState({ submitted: false }
        );
        if (this.state.success === true) {
          this.props.history.push("/contacts");
        }}, 3000);

    });
  }


  render() {
    return (
      <div >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ?
            <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Successful contact creation!</Alert>
            : !this.state.success && this.state.submitted ? <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>


          <Card style={{ width: "48rem" }}>
            <Card.Header as="h5">Create Contact</Card.Header>
            <Card.Body>
              <div className="Login">
                <Form >
                  <FormGroup bsSize="large">
                    <FormControl
                      onChange={(e) => this.setState({ contactName: e.target.value })}
                      placeholder="Name"
                    />
                  </FormGroup>

                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      onChange={(e) => this.setState({ email: e.target.value })}
                      placeholder="Email"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Phone"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Address"
                      onChange={(e) => this.setState({ address: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        onChange={(e) => this.setState({ city: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        onChange={(e) => this.setState({ state: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        onChange={(e) => this.setState({ zipCode: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Card.Header as="h6">Institution Details</Card.Header>
                  <br></br>
                  <label>
          <select value={this.state.value} onChange={this.handleChange}>
                      <option value="Select Institution">Select Institution</option>
                      
                      {
                        this.state.uniqueData.length > 0 ?
                        this.state.uniqueData.map(institution => (
                              <option key = {institution} value = {institution}>
                                {institution}
                              </option>
                      ))
                      : ''
                      }
                    </select>
                  </label>
                  <br></br>
                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Institution Name"
                      value={this.state.institutionName || ''}
                      onChange={(e) => this.setState({ institutionName: e.target.value })} />
                  </FormGroup>
                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Institution Address"
                      value={this.state.institutionAddress || ''}
                      onChange={(e) => this.setState({ institutionAddress: e.target.value })} />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        value={this.state.institutionCity || ''}
                        onChange={(e) => this.setState({ institutionCity: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        value={this.state.institutionState || ''}
                        onChange={(e) => this.setState({ institutionState: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        value={this.state.institutionZipCode || ''}
                        onChange={(e) => this.setState({ institutionZipCode: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Button
                    block
                    bssize="large"
                    onClick={this.handleSubmit}
                    type="submit"
    
                  >
                    Submit
              </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>

        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateContact);