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
    getDonor: actions.getDonor,
    updateDonor: actions.updateDonor,
  }, dispatch);
}

export class EditDonor extends Component {
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
      institution: "",
      contact: {
        contactName: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        zipCode: "",
        institution:""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
        zipCode:  response.payload.zipCode,
        institution: response.payload.institution,
        contact: response.payload.contact
      })
    })
  }




  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, addrState, city, zipCode, contact } = this.state;
   

    const { updateDonor } = this.props;
    console.log("hi");
    console.log(contact.contactName);
    updateDonor(this.props.match.params.donorId, name, email, phone, address, addrState, city, zipCode, contact).then(response => {
    
      this.setState({ submitted: true })
      if (response.type === 'SUCCESS') {
        this.setState({ success: true })
      }
      if (response.type === 'FAILURE') {
        this.setState({ success: false })
      }
      setTimeout(() => {
        this.setState({ submitted: false });
        if (this.state.success === true) {
          this.props.history.push('/donors');
        }
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
                    <Alert isOpen={this.state.visible} style={{width: "48rem"}} variant='success'> Successful donor
                update!</Alert>
                : !this.state.success && this.state.submitted ?
                    <Alert style={{width: "48rem"}} variant='danger'> Error!</Alert> : ''}
          </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Card style={{width: "80rem"}}>
                <Card.Header as="h5">Donor Details</Card.Header>
                <Card.Body>
                  <div className="Edit Donor">
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
                      <FormGroup controlId="contactName" bssize="large">
                        <label htmlFor="inputContactName">Contact</label>
                         <FormControl value={this.state.contact? this.state.contact.contactName || '' : ''}
                                           onChange={e => this.setState({ contact: { ...this.state.contact, contactName: e.target.value} })}
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
                          href={`/donors`}
                          type="reset"
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

export default connect(null, mapDispatchToProps)(EditDonor);