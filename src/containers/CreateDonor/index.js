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


import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDonor: actions.createDonor,
  }, dispatch);
}



export class CreateDonor extends Component {
  state = {
    donorName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    institution: '',
    success: false,
    submitted: false,
    visible: false,
    error: false

  }



  handleSubmit = (e) => {
    e.preventDefault();
    const { donorName, email, phone, address, state, city, zipCode, institution } = this.state;
    const { createDonor } = this.props;
    if (!!(donorName) || donorName === '') {
      this.setState({ error: true });
    }
    else {
      this.setState({ error: false });
      createDonor(donorName, email, phone, address, state, city, zipCode, institution).then(response => {
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
            this.props.history.push('/donors')
          }
        }, 3000);

      });
    }
  }



  render() {

    return (
      <div >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ?
            <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Successful donor creation!</Alert>
            : !this.state.success && this.state.submitted ? <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "48rem" }}>
            <Card.Header as="h5">Create Donor</Card.Header>
            <Card.Body>
              <div className="Login">
                <Form >
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={(e) => this.setState({ donorName: e.target.value })}
                      placeholder="Name"
                    />
                    {this.state.error ? <span style={{ color: "red" }}>Username is required</span> : ''}
                  </FormGroup>

                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      onChange={(e) => this.setState({ email: e.target.value })}
                      placeholder="Email"
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Phone"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <FormGroup bssize="large">
                    <FormControl
                      placeholder="Address"
                      onChange={(e) => this.setState({ address: e.target.value })}
                    />
                  </FormGroup>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="City"
                        onChange={(e) => this.setState({ city: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="State"
                        onChange={(e) => this.setState({ state: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zip"
                        onChange={(e) => this.setState({ zipCode: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <br></br>

                  <FormGroup bsSize="large">
                    <FormControl
                      placeholder="Institution"
                      onChange={(e) => this.setState({ institution: e.target.value })} />
                  </FormGroup>
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

export default connect(null, mapDispatchToProps)(CreateDonor);