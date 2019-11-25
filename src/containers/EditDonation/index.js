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
import moment from "moment";

//TODO get zipcode update and institution get and update to work!  Rerender list and forms on back button
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDonation: actions.getDonation,
      updateDonation: actions.updateDonation
    },
    dispatch
  );
}

export class EditDonation extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      donationAmount: "",
      donationDate: "",
      note: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .getDonation(this.props.match.params.donationId)
      .then(response => {
        this.setState({
          donationAmount: response.payload.donationAmount,
          donationDate: response.payload.donationDate,
          note: response.payload.note
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { donationAmount, donationDate, note } = this.state;
    const { updateDonation } = this.props;
    updateDonation(
      this.props.match.params.donationId,
      donationAmount,
      donationDate,
      note
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
          this.props.history.push("donor/:donorId/donations");
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
              Successful donation update!
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
            <Card.Header as="h5">Edit Donation</Card.Header>
            <Card.Body>
              <div className="Edit Donor">
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                      <label htmlFor="inputAmount">Amount</label>
                      <FormControl
                        value={this.state.donationAmount || ""}
                        onChange={e =>
                          this.setState({ donationAmount: e.target.value })
                        }
                        type="text"
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <FormGroup bsSize="large">
                    <input
                      type="date"
                      value={moment(this.state.donationDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={e =>
                        this.setState({ donationDate: e.target.value })
                      }
                    />
                  </FormGroup>

                  <br></br>
                  <label htmlFor="inputNote">Note</label>
                  <FormGroup bsSize="large">
                    <FormControl
                      value={this.state.note}
                      onChange={e => this.setState({ note: e.target.value })}
                      type="text"
                    />
                  </FormGroup>
                  <br></br>
                  <br></br>
                  <Button block bsSize="large" type="submit">
                    Save
                  </Button>
                  <Button block bsSize="large" href={`/donors`} type="submit">
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
)(EditDonation);
