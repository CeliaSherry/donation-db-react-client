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
import Alert from "react-bootstrap/Alert";

//TODO get institution to work! Fix zipcode leading 0 issue
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getContact: actions.getContact,
    updateContact: actions.updateContact,
  }, dispatch);
}

export class EditContact extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      addrState: "",
      zipCode: "",
      institution: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("Hello");
    this.props.getContact(this.props.match.params.contactId).then(response => {
      this.setState({
        name: response.payload.contactName,
        phone: response.payload.phone,
        email: response.payload.email,
        address: response.payload.address,
        city: response.payload.city,
        addrState: response.payload.state,
        zipCode:  response.payload.zipCode,
        institutionName: [response.payload.institution],
      
      })
    })
  }



  // validateForm() {
  //   return this.email.length > 0 && this.password.length > 0;
  // }



  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, addrState, city, zipCode, institutionName } = this.state;
    const { updateContact } = this.props;
    updateContact(this.props.match.params.contactId, name, email, phone, address, addrState, city, zipCode, institutionName).then(response => {
      this.setState({ submitted: true })
      if (response.type === 'SUCCESS') {
        this.setState({ success: true })
          //this.props.history.push('/donors')
      }
      if (response.type === 'FAILURE') {
        this.setState({ success: false })
      }
      setTimeout(() => {
        this.setState({ submitted: false });
      }, 3000);
    });
    window.scrollTo(0, this.myRef.current.top);
  }

  render() {
    return (
        <div>
            <div ref={this.myRef}/>
          <div style={{display: "flex", justifyContent: "center"}}>
            {this.state.success && this.state.submitted ?
                <Alert isOpen={this.state.visible} style={{width: "48rem"}} variant='success'> Successful contact
                  update!</Alert>
                : !this.state.success && this.state.submitted ?
                    <Alert style={{width: "48rem"}} variant='danger'> Error!</Alert> : ''}
          </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Card style={{width: "48rem"}}>
                <Card.Header as="h5">Edit Contact</Card.Header>
                <Card.Body>
                  <div className="Edit Contact">
                    <form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col>
                          <label htmlFor="inputFullName">Full Name</label>
                            <FormControl value={this.state.name || ''}
                                         onChange={e => this.setState({name: e.target.value})}
                                         type="text"/>
                        </Col>
                      </Row>
                      <br></br>
                      <FormGroup controlId="email" bssize="large">
                        <label htmlFor="inputEmail">Email Address</label>
                            <FormControl value={this.state.email || ''}
                                         onChange={e => this.setState({email: e.target.value})}
                                         type="email"/>
                      </FormGroup>
                        <br></br>
                      <label htmlFor="inputPhone">Phone Number</label>
                      <FormGroup controlId="phone" bssize="large">
                          <FormControl value={this.state.phone || ''}
                                       onChange={e => this.setState({phone: e.target.value})}
                                       type="text"/>
                      </FormGroup>
                      <br></br>
                      <FormGroup controlId="address" bssize="large">
                        <label htmlFor="inputStreet">Street Address</label>
                          <FormControl value={this.state.address || ''}
                                       onChange={e => this.setState({address: e.target.value})}
                                       type="text"/>
                      </FormGroup>
                      <br></br>
                      <Row>
                        <Col>
                          <FormGroup controlId="city" bssize="large">
                            <label htmlFor="inputCity">City</label>
                              <FormControl value={this.state.city || ''}
                                           onChange={e => this.setState({city: e.target.value})}
                                           type="text"/>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup controlId="state" bssize="large">
                            <label htmlFor="inputState">State</label>
                              <FormControl value={this.state.addrState || ''}
                                           onChange={e => this.setState({addrState: e.target.value})}
                                           type="text"/>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup controlId="zip" bssize="large">
                            <label htmlFor="inputZip">Zip</label>
                              <FormControl value={this.state.zipCode || ''}
                                           onChange={e => this.setState({zipCode: e.target.value.replace(/\D/,'')})}
                                           type="text"/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <br></br>
                      <FormGroup controlId="institution" bssize="large">
                        <label htmlFor="inputInstitution">Institution</label>
                          <FormControl value={this.state.institution || ''}
                                       onChange={e => this.setState({institutionName: e.target.value})}
                                       type="text"/>
                      </FormGroup>

                      <br></br>
                      <Button
                          block
                          bssize="large"
                          // disabled={!this.validateForm()}
                          type="submit"
                      >
                        Save
                      </Button>
                      <Button
                          block
                          bssize="large"
                          href={`/contacts`}
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
          </div>
          );
  }
}

export default connect(null, mapDispatchToProps)(EditContact);