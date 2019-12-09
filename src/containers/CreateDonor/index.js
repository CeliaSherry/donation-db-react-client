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
import CreatableSelect from "react-select/creatable";

import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createDonorWithContact: actions.createDonorWithContact,
      createDonationForDonor: actions.createDonationForDonor,
      getInstitution: actions.getInstitution,
      getAllInstitutions: actions.getAllInstitutions,
      getAllContacts: actions.getAllContacts,
      addDonorToExistingContact: actions.addDonorToExistingContact
    },
    dispatch
  );
}

export class CreateDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      donorAddress: "",
      donorState: "",
      donorCity: "",
      donorZipCode: "",
      contactId: "",
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
      errorDate: false,
      selectedOption: "",
      value: "Select Institution",
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      addrState: "",
      zipCode: "",
      institution: "",
      contact: "",
      data: [],
      uniqueData: [],
      contactData: [],
      existingContact: false,
      contactOptionData: []
    };

    this.handleChange = this.handleChange.bind(this);
  }
  onlyUnique(value, index, self) {
    if (value != null) {
      return self.indexOf(value) === index;
    }
  }
  componentWillMount() {
    this.props.getAllContacts().then(response => {
      this.setState({ contactData: response.payload });
    });

    this.props.getAllInstitutions().then(response => {
      this.state.uniqueData = response.payload
        .map(institution =>
          institution.institutionName != null
            ? institution.institutionName.toUpperCase()
            : institution.institutionName
        )
        .filter(this.onlyUnique)
        .sort();
      this.setState({
        data: response.payload
      });
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value !== "Select Institution") {
      this.props.getInstitution(event.target.value).then(response => {
        this.setState({
          institutionName: response.payload.institutionName,
          address: response.payload.address,
          city: response.payload.city,
          addrState: response.payload.state,
          zipCode: response.payload.zipCode
        });
      });
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
    contactId: "",
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
    errorDate: false,
    selectedOption: "",
    contactOptionData: []
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
      contactId,
      contactName,
      contactEmail,
      contactPhone,
      contactAddress,
      contactState,
      contactCity,
      contactZipCode
    } = this.state;
    const {
      createDonorWithContact,
      createDonationForDonor,
      addDonorToExistingContact
    } = this.props;
    if (donorName === "" || donorName == null) {
      this.setState({ errorName: true });
    } else if (!donationAmount) {
      this.setState({ errorDate: true });
    } else {
      this.setState({ errorName: false });
      this.setState({ errorDate: false });

      if (contactId !== "" || contactId) {
        addDonorToExistingContact(
          contactId,
          donorName,
          donorEmail,
          donorPhone,
          donorAddress,
          donorState,
          donorCity,
          donorZipCode
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
      } else {
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
    }
    setTimeout(() => {
      if (this.state.success === true) {
        this.props.history.push("/donors");
      }
    }, 3000);
  };

  handleContactInputChange = selectedOption => {
    this.setState({ contactName: selectedOption });
  };

  handleContactChange = selectedOption => {
    if (selectedOption !== null && selectedOption.index) {
      let contact = this.state.contactData[selectedOption.index];
      this.setState({ contactId: contact.id });
      this.setState({ contactName: contact.contactName });
      this.setState({ contactEmail: contact.email });
      this.setState({ contactPhone: contact.phone });
      this.setState({ contactAddress: contact.address });
      this.setState({ contactCity: contact.city });
      this.setState({ contactState: contact.state });
      this.setState({ contactZipCode: contact.zipCode });
      if (contact.institution) {
        this.setState({ institutionName: contact.institution.institutionName });
        this.setState({ institutionAddress: contact.institution.address });
        this.setState({ institutionCity: contact.institution.city });
        this.setState({ institutionState: contact.institution.state });
        this.setState({ institutionZipCode: contact.institution.zipCode });
      }
    }
  };

  getContactsOptions(data) {
    let options = [];
    data.forEach((contact, index) => {
      options.push({
        label: contact.contactName,
        value: contact.contactName,
        index: index
      });
    });
    return options;
  }

  render() {
    let optionArray = [];
    if (this.state.contactName) {
      optionArray.push({
        label: this.state.contactName,
        value: this.state.contactName
      });
    } else {
      optionArray = "";
    }

    const contactOptions =
      this.state.contactData && this.state.contactData.length > 0
        ? this.getContactsOptions(this.state.contactData)
        : [];

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
          ) : !this.state.success &&
            this.state.submitted &&
            !this.state.errorDate &&
            !this.state.errorName ? (
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
                  <CreatableSelect
                    id="cs"
                    value={optionArray}
                    placeholder="Contact Name"
                    isClearable
                    onCreateOption={this.handleContactInputChange}
                    options={contactOptions}
                    onChange={this.handleContactChange}
                    createOptionPosition={"first"}
                  />

                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      id="contactEmail"
                      value={this.state.contactEmail || ""}
                      onChange={e =>
                        this.setState({ contactEmail: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      value={this.state.contactPhone || ""}
                      placeholder="Phone"
                      onChange={e =>
                        this.setState({ contactPhone: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      value={this.state.contactAddress || ""}
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
                        value={this.state.contactCity || ""}
                        placeholder="City"
                        onChange={e =>
                          this.setState({ contactCity: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={this.state.contactState || ""}
                        placeholder="State"
                        onChange={e =>
                          this.setState({ contactState: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={this.state.contactZipCode || ""}
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

                  <br></br>

                  <FormGroup bssize="large">
                    <FormControl
                      value={this.state.institutionName || ""}
                      placeholder="Institution Name"
                      onChange={e =>
                        this.setState({ institutionName: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      value={this.state.institutionAddress || ""}
                      placeholder="Address"
                      onChange={e =>
                        this.setState({ institutionAddress: e.target.value })
                      }
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        value={this.state.institutionCity || ""}
                        placeholder="City"
                        onChange={e =>
                          this.setState({ institutionCity: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={this.state.institutionState || ""}
                        placeholder="State"
                        onChange={e =>
                          this.setState({ institutionState: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        value={this.state.institutionZipCode || ""}
                        placeholder="Zip"
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
