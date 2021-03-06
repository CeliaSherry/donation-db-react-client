import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import FormControl from "react-bootstrap/FormControl";

export class SearchDonors extends Component {
  state = {
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donorAddress: "",
    donorState: "",
    donorCity: "",
    donorZipCode: "",
    contactName: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.props.history.push({
      pathname: `/donors?name=${this.state.donorName}&email=${this.state.donorEmail}&phone=${this.state.donorPhone}&address=${this.state.donorAddress}&city=${this.state.donorCity}&state=${this.state.donorState}&zip=${this.state.donorZipCode}&contact=${this.state.contactName}`
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "68rem" }}>
            <Card.Header as="h5">
              Search Donors (All Fields Optional)
            </Card.Header>
            <Card.Body>
              <div className="Login">
                <Form>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ donorName: e.target.value })
                      }
                      placeholder="Name"
                    />
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
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={e =>
                        this.setState({ contactName: e.target.value })
                      }
                      placeholder="Contact name"
                    />
                  </FormGroup>
                  <br></br>
                  <Button
                    type="submit"
                    block
                    bssize="large"
                    onClick={this.handleSubmit}
                  >
                    Search
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

export default connect(null)(SearchDonors);
