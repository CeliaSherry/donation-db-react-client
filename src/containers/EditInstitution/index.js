import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import * as actions from "./actions";
import FormControl from "react-bootstrap/FormControl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";

//TODO get institution to work! Fix zipcode leading 0 issue
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getInstitution: actions.getInstitution,
      updateInstitution: actions.updateInstitution
    },
    dispatch
  );
}

export class EditInstitution extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      institutionName: "",
      address: "",
      state: "",
      city: "",
      zipCode: "",
      success: false,
      submitted: false,
      visible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .getInstitution(this.props.match.params.institutionId)
      .then(response => {
        this.setState({
          institutionName: response.payload.institutionName,
          address: response.payload.address,
          city: response.payload.city,
          state: response.payload.state,
          zipCode: response.payload.zipCode
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { institutionName, address, state, city, zipCode } = this.state;
    const { updateInstitution } = this.props;
    updateInstitution(
      this.props.match.params.institutionId,
      institutionName,
      address,
      state,
      city,
      zipCode
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
          this.props.history.push(`/institutions`);
          this.props.history.push({
            pathname: `/institutions`
          });
        }
      }, 3000);
    });
    window.scrollTo(0, this.myRef.current.top);
  };

  render() {
    return (
      <div>
        <div ref={this.myRef} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ? (
            <Alert
              isOpen={this.state.visible}
              style={{ width: "48rem" }}
              variant="success"
            >
              {" "}
              Successful Institution update!
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
            <Card.Header as="h5">Edit Institution</Card.Header>
            <Card.Body>
              <div className="Edit Institution">
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                      <label htmlFor="inputFullName">Institution Name</label>
                      <FormControl
                        value={this.state.institutionName || ""}
                        onChange={e =>
                          this.setState({ institutionName: e.target.value })
                        }
                        type="text"
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <FormGroup controlId="address" bssize="large">
                    <label htmlFor="inputStreet">Street Address</label>
                    <FormControl
                      value={this.state.address || ""}
                      onChange={e => this.setState({ address: e.target.value })}
                      type="text"
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <FormGroup controlId="city" bssize="large">
                        <label htmlFor="inputCity">City</label>
                        <FormControl
                          value={this.state.city || ""}
                          onChange={e =>
                            this.setState({ city: e.target.value })
                          }
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup controlId="state" bssize="large">
                        <label htmlFor="inputState">State</label>
                        <FormControl
                          value={this.state.state || ""}
                          onChange={e =>
                            this.setState({ state: e.target.value })
                          }
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup controlId="zip" bssize="large">
                        <label htmlFor="inputZip">Zip</label>
                        <FormControl
                          value={this.state.zipCode || ""}
                          onChange={e =>
                            this.setState({
                              zipCode: e.target.value.replace(/\D/, "")
                            })
                          }
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <br></br>
                  <Button
                    block
                    bssize="large"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    block
                    bssize="large"
                    href={`/institutions`}
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

export default connect(
  null,
  mapDispatchToProps
)(EditInstitution);
