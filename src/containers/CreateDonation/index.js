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
    createDonation: actions.createDonation,
  }, dispatch);
}


export class CreateDonation extends Component {
    
  state = {
    donationAmount: '',
    donationDate: new Date(),
    note: '',
    success: false,
    submitted: false,
    visible: false,

  }



  handleSubmit = (e) => {
    e.preventDefault();
    const { donationAmount, donationDate, note} = this.state;
    const { createDonation } = this.props;
    console.log(this.props);
    createDonation(donationAmount, donationDate, note).then(response => {
      this.setState({ submitted: true })
      if (response.type === 'SUCCESS') {
        this.setState({ success: true })
      }
      if (response.type === 'FAILURE') {
        this.setState({ success: false })
      }
      setTimeout(() => {
        this.setState({ submitted: false });
      }, 3000);

    });
  }


  render() {

    return (
      <div >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ?
            <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Donation added successfully!</Alert>
            : !this.state.success && this.state.submitted ? <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>


          <Card style={{ width: "48rem" }}>
            <Card.Header as="h5">Create Donation</Card.Header>
            <Card.Body>
              <div className="Login">
                <Form >
                  <FormGroup bsSize="large">
                    <FormControl
                      onChange={(e) => this.setState({ donationAmount: e.target.value })}
                      placeholder="$"
                    />
                  </FormGroup>

                  <br></br>
                  <FormGroup bsSize="large">
                  <input type="date"
                  onChange={(e) => this.setState({ donationAmount: e.target.value })}
                  />

                  </FormGroup>
                  <br></br>
                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Notes"
                      style={{height: "140px"}}

                      onChange={(e) => this.setState({ note: e.target.value })}
                    />
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
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateDonation);
