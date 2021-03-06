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
  return bindActionCreators(
    {
      createDonationForDonor: actions.createDonationForDonor
    },
    dispatch
  );
}

export class CreateDonation extends Component {
  state = {
    donationAmount: null,
    donationDate: moment(new Date()).format("YYYY-MM-DD"),
    note: "",
    success: false,
    thankYou: false,
    submitted: false,
    visible: false,
    error: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { donationAmount, donationDate, note, thankYou } = this.state;
    const { createDonationForDonor } = this.props;
    if (donationAmount == null) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      createDonationForDonor(
        this.props.match.params.donorId,
        donationAmount,
        donationDate,
        note,
        thankYou
      ).then(response => {
        this.setState({ submitted: true });
        if (response.type === "SUCCESS") {
          this.setState({ success: true });
        }
        if (response.type === "FAILURE") {
          this.setState({ success: false });
        }
        setTimeout(() => {
          this.setState({ submitted: false });
          if (this.state.success === true) {
            this.props.history.push({
              pathname: `/donor/${this.props.match.params.donorId}/details`,
              state: { donorName: this.props.location.state.donorName }
            });
          }
        }, 3000);
      });
    }
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ? (
            <Alert
              isOpen={this.state.visible}
              style={{ width: "48rem" }}
              variant="success"
            >
              {" "}
              Donation added successfully!
            </Alert>
          ) : !this.state.success && this.state.submitted ? (
            <Alert style={{ width: "48rem" }} variant="danger">
              {" "}
              Error!
            </Alert>
          ) : (
            ""
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "48rem" }}>
            <Card.Header as="h5">
              Add Donation for donor {this.props.location.state.donorName}
            </Card.Header>
            <Card.Body>
              <div className="Login">
                <Form>
                  <FormGroup bssize="large">
                    <label htmlFor="inputAmount">Amount</label>

                    <FormControl
                      type="number"
                      onChange={e =>
                        this.setState({ donationAmount: e.target.value })
                      }
                      placeholder="$"
                    />
                    {this.state.error ? (
                      <span style={{ color: "red" }}>Amount is required</span>
                    ) : (
                      ""
                    )}
                  </FormGroup>

                  <br></br>
                  <label htmlFor="inputDate">Date</label>

                  <FormGroup bssize="large">
                    <input
                      type="date"
                      value={this.state.donationDate}
                      onChange={e =>
                        this.setState({ donationDate: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <label>
                    Thank You Sent
                    <br></br>
                    <input
                      name="thankYouSent"
                      type="checkbox"
                      checked={this.state.thankYou}
                      onChange={e =>
                        this.setState({ thankYou: e.target.checked })
                      }
                    />
                  </label>
                  <br></br>
                  <br></br>

                  <FormGroup bssize="large">
                    <label htmlFor="inputNote">Note</label>

                    <FormControl
                      placeholder="Notes"
                      style={{ height: "140px" }}
                      onChange={e => this.setState({ note: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <Button block bssize="large" onClick={this.handleSubmit}>
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

export default connect(
  null,
  mapDispatchToProps
)(CreateDonation);
