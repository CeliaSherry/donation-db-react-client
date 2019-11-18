import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
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
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      addrState: "",
      zipCode: "",
      institution: ""
    }
  }

  componentDidMount() {
    this.props.getDonor(this.props.match.params.donorId).then(response => {
      this.setState({
        name: response.payload.donorName,
        phone: response.payload.phone,
        email: response.payload.email,
        address: response.payload.address,
        city: response.payload.city,
        addrState: response.payload.state,
        zipCode: response.payload.zipCode
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
              <div className="Edit Donor">
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                      <label htmlFor="inputFullName">Full Name</label>
                      {(this.state.name != null) ?
                          <FormControl value={this.state.name}
                                       onChange={e => this.setState({name: e.target.value})}
                                       type="text"/>
                          : <FormControl value={this.name}
                                         onChange={e => this.setState({name: e.target.value})}
                                         type="text"/>}
                    </Col>
                  </Row>
                  <br></br>
                  <FormGroup controlId="email" bsSize="large">
                    <label htmlFor="inputEmail">Email Address</label>
                    {(this.state.email != null) ?
                        <FormControl value={this.state.email}
                                     onChange={e => this.setState({email: e.target.value})}
                                     type="text"/>
                        : <FormControl value={this.email}
                                       onChange={e => this.setState({email: e.target.value})}
                                       type="text"/>}
                  </FormGroup>
                  <br></br>
                  <label htmlFor="inputPhone">Phone Number</label>
                  <FormGroup controlId="phone" bsSize="large">
                    {(this.state.phone != null) ?
                        <FormControl value={this.state.phone}
                                     onChange={e => this.setState({phone: e.target.value})}
                                     type="text"/>
                        : <FormControl value={this.phone}
                                       onChange={e => this.setState({phone: e.target.value})}
                                       type="text"/>}
                  </FormGroup>
                  <br></br>
                  <FormGroup controlId="address" bsSize="large">
                    <label htmlFor="inputStreet">Street Address</label>
                    {(this.state.address != null) ?
                        <FormControl value={this.state.address}
                                     onChange={e => this.setState({address: e.target.value})}
                                     type="text"/>
                        : <FormControl value={this.address}
                                       onChange={e => this.setState({address: e.target.value})}
                                       type="text"/>}
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <FormGroup controlId="city" bsSize="large">
                        <label htmlFor="inputCity">City</label>
                        {(this.state.city != null) ?
                            <FormControl value={this.state.city}
                                         onChange={e => this.setState({city: e.target.value})}
                                         type="text"/>
                            : <FormControl value={this.city}
                                           onChange={e => this.setState({city: e.target.value})}
                                           type="text"/>}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup controlId="state" bsSize="large">
                        <label htmlFor="inputState">State</label>
                        {(this.state.addrState != null) ?
                            <FormControl value={this.state.addrState}
                                         onChange={e => this.setState({addrState: e.target.value})}
                                         type="text"/>
                            : <FormControl value={this.addrState}
                                           onChange={e => this.setState({addrState: e.target.value})}
                                           type="text"/>}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup controlId="zip" bsSize="large">
                        <label htmlFor="inputZip">Zip</label>
                        {(this.state.zipCode != null) ?
                            <FormControl value={this.state.zipCode}
                                         onChange={e => this.setState({zipCode: e.target.value})}
                                         type="text"/>
                            : <FormControl value={this.zipCode}
                                           onChange={e => this.setState({zipCode: e.target.value})}
                                           type="text"/>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <br></br>
                  <FormGroup controlId="institution" bsSize="large">
                    <label htmlFor="inputInstitution">Institution</label>
                    {(this.state.institution != null) ?
                        <FormControl value={this.state.institution}
                                     onChange={e => this.setState({institution: e.target.value})}
                                     type="text"/>
                        : <FormControl value={this.city}
                                       onChange={e => this.setState({institution: e.target.value})}
                                       type="text"/>}
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
                  <Button
                      block
                      bsSize="large"
                      href={`/donors`}
                      // disabled={!this.validateForm()}
                      type="submit"
                  >
                    Cancel
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