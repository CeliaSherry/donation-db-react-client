import React, { Component } from "react";
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
import moment from "moment";


import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createDonorWithContact: actions.createDonorWithContact,
      createDonationForDonor: actions.createDonationForDonor,
      getInstitution: actions.getInstitution,
      getAllInstitutions: actions.getAllInstitutions
    },
    dispatch
  );
}

export class CreateDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Select Institution',
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      addrState: "",
      zipCode: "",
      institution: "",
      contact: "",
      data: []
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getAllInstitutions().then(response => {
      console.log(response)
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
          address: response.payload.address,
          city: response.payload.city,
          addrState: response.payload.state,
          zipCode: response.payload.zipCode
        })
      })
    }

  }

  state = {
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donorAddress: "",
    donorState: "",
    donorCity: "",
    donorZipCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    contactState: "",
    contactCity: "",
    contactZipCode: "",
    institutionName: "",
    institutionEmail: "",
    institutionAddress: "",
    institutionState: "",
    institutionCity: "",
    institutionZipCode: "",
    donationAmount: "",
    donationDate: moment(new Date()).format("YYYY-MM-DD"),
    note: "",
    success: false,
    submitted: false,
    visible: false,
    errorName: false,
    errorDate: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      donorName,
      donorEmail,
      donorPhone,
      donorAddress,
      donorState,
      donorCity,
      donorZipCode,
      donationAmount,
      donationDate,
      note,
      institutionName,
      institutionEmail,
      institutionAddress,
      institutionState,
      institutionCity,
      institutionZipCode,
      contactName,
      contactEmail,
      contactPhone,
      contactAddress,
      contactState,
      contactCity,
      contactZipCode
    } = this.state;
    const { createDonorWithContact, createDonationForDonor } = this.props;
    if (donorName === "" || donorName == null) {
      this.setState({ errorName: true });
    } else if (!donationAmount) {
      this.setState({ errorDate: true });
    } else {
      this.setState({ errorName: false });
      this.setState({ errorDate: false });
      createDonorWithContact(
        donorName,
        donorEmail,
        donorPhone,
        donorAddress,
        donorState,
        donorCity,
        donorZipCode,
        contactName,
        contactEmail,
        contactPhone,
        contactAddress,
        contactState,
        contactCity,
        contactZipCode,
        institutionName,
        institutionEmail,
        institutionAddress,
        institutionState,
        institutionCity,
        institutionZipCode
      ).then(response => {
        if (response.type === "SUCCESS") {
          createDonationForDonor(
            response.payload.id,
            donationAmount,
            donationDate,
            note
          ).then(response => {
            if (response.type === "SUCCESS") {
              this.setState({ success: true });
            }
          });
          this.setState({ submitted: false });
        }
        if (response.type === "FAILURE") {
          this.setState({ success: false });
          this.setState({ submitted: false });
        }

      });
    }
    setTimeout(() => {
      if (this.state.success === true) {
        this.props.history.push("/donors");
      }
    }, 3000);

  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success ? (
            <Alert
              isOpen={this.state.visible}
              style={{ width: "48rem" }}
              variant="success"
            >
              {" "}
              Successful donor creation!
            </Alert>
          ) : !this.state.success && this.state.submitted && !this.state.errorDate && !this.state.errorName ? (
            <Alert style={{ width: "48rem" }} variant="danger">
              {" "}
              Error!
            </Alert>
          ) : (
                ""
              )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "68rem" }}>
            <Card.Header as="h5">Add Donation</Card.Header>
            <Card.Body>
              <div className="Login">
                <h5>Donor details</h5>
                <Form>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ donorName: e.target.value })
                      }
                      placeholder="Name"
                    />
                    {this.state.submitted && this.state.errorName ? (
                      <span style={{ color: "red" }}>
                        Donor name is required
                      </span>
                    ) : (
                        ""
                      )}
                  </FormGroup>

                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ donorEmail: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Phone"
                      onChange={e =>
                        this.setState({ donorPhone: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Address"
                      onChange={e =>
                        this.setState({ donorAddress: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        onChange={e =>
                          this.setState({ donorCity: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        onChange={e =>
                          this.setState({ donorState: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        onChange={e =>
                          this.setState({ donorZipCode: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <hr style={{ color: "black", borderWidth: "2px" }} />
                  <h5>Amount</h5>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      type="number"
                      onChange={e =>
                        this.setState({ donationAmount: e.target.value })
                      }
                      placeholder="$"
                    />
                    {this.state.submitted && this.state.errorDate ? (
                      <span style={{ color: "red" }}>Amount is required</span>
                    ) : (
                        ""
                      )}
                  </FormGroup>

                  <br></br>
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
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Notes"
                      style={{ height: "140px" }}
                      onChange={e => this.setState({ note: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <hr style={{ color: "black", borderWidth: "2px" }} />
                  <h5>Contact details</h5>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ contactName: e.target.value })
                      }
                      placeholder="Contact name"
                    />
                    {/* {this.state.error ? <span style={{ color: "red" }}>Username is required</span> : ''} */}
                  </FormGroup>

                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ contactEmail: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Phone"
                      onChange={e =>
                        this.setState({ contactPhone: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Address"
                      onChange={e =>
                        this.setState({ contactAddress: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        onChange={e =>
                          this.setState({ contactCity: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        onChange={e =>
                          this.setState({ contactState: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        onChange={e =>
                          this.setState({ contactZipCode: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <hr style={{ color: "black", borderWidth: "2px" }} />
                  <h5>Institution details</h5>
                  <label>
          <select value={this.state.value} onChange={this.handleChange}>
                      <option value="Select Institution">Select Institution</option>
                      {
                        this.state.data.length > 0 ?
                        this.state.data.map(institution => (
                              <option key = {institution.institutionName} value = {institution.institutionName}>
                                {institution.institutionName}
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
                      placeholder="Institution name"
                      value={this.state.institutionName || ''}
                      onChange={e =>
                        this.setState({ institutionName: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Address"
                      value={this.state.address || ''}
                      onChange={e =>
                        this.setState({ institutionaAdress: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        value={this.state.city || ''}
                        onChange={e =>
                          this.setState({ institutionCity: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        value={this.state.addrState || ''}
                        onChange={e =>
                          this.setState({ institutionState: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        value={this.state.zipCode || ''}
                        onChange={e =>
                          this.setState({ institutionZipCode: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Button
                    type="submit"
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

export default connect(
  null,
  mapDispatchToProps
)(CreateDonor);
