import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";
import moment from "moment";



import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDonationForDonor: actions.createDonationForDonor,
  }, dispatch);
}


export class CreateDonation extends Component {

  state = {
    donationAmount: '',
    donationDate: moment(new Date()).format("YYYY-MM-DD"),
    note: '',
    success: false,
    submitted: false,
    visible: false,

  }



  handleSubmit = (e) => {
    e.preventDefault();
    const { donationAmount, donationDate, note } = this.state;
    const { createDonationForDonor } = this.props;
    console.log(this.props);
    createDonationForDonor(this.props.match.params.donorId, donationAmount, donationDate, note).then(response => {
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
          this.props.history.push({ pathname: `/donors/${this.props.match.params.donorId}/donations`, state: { donorName: this.props.location.state.donorName } })
        }
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
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={(e) => this.setState({ donationAmount: e.target.value })}
                      placeholder="$"
                    />
                  </FormGroup>

                  <br></br>
                  <FormGroup bssize="large">
                    <input type="date"
                    value = {this.state.donationDate}
                      onChange={(e) => this.setState({ donationDate: e.target.value })}
                    />

                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Notes"
                      style={{ height: "140px" }}

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
