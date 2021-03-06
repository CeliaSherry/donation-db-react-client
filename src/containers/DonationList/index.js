import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Alert from "react-bootstrap/Alert";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDonationsForDonor: actions.getDonationsForDonor,
      deleteDonation: actions.deleteDonation
    },
    dispatch
  );
}

export class DonationList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: []
    };
  }
  handleSubmit = (e, id, index) => {
    e.preventDefault();
    const { deleteDonation } = this.props;
    deleteDonation(id).then(response => {
      this.setState({ submitted: true });
      if (response.type === "SUCCESS") {
        this.setState({
          success: true,
          data: this.state.data.filter((_, i) => i !== index)
        });
      }
      if (response.type === "FAILURE") {
        this.setState({ success: false });
      }
      setTimeout(() => {
        this.setState({ submitted: false });
      }, 3000);
    });
    window.scrollTo(0, this.myRef.current.top);
  };

  componentWillMount() {
    this.props
      .getDonationsForDonor(this.props.match.params.donorId)
      .then(response => {
        this.setState({
          data: response.payload
        });
      });
  }

  render() {
    return this.state.data && this.state.data.length === 0 ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h4>No donations recorded</h4>
      </div>
    ) : (
      <div id="donationsList">
        <div ref={this.myRef} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
            {this.state.success && this.state.submitted ? (
              <Alert
                isOpen={this.state.visible}
                style={{ width: "48rem" }}
                variant="success"
              >
                {" "}
                Donation deleted!
              </Alert>
            ) : !this.state.success && this.state.submitted ? (
              <Alert style={{ width: "48rem" }} variant="danger">
                {" "}
                Error!
              </Alert>
            ) : (
              ""
            )}

            <Button
              style={{ float: "right", width: "10em", marginBottom: "10px" }}
              variant="dark"
            >
              <Link
                style={{ color: "white" }}
                to={{
                  pathname: `/donor/${this.props.match.params.donorId}/donation/create`,
                  state: { donorName: this.props.location.state.donorName }
                }}
              >
                Add Donation
              </Link>
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <Card.Header as="h5">Donations</Card.Header>
            <Table responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th data-field="donationAmount" data-sortable="true">
                    Amount
                  </th>
                  <th>Notes</th>
                  <th>Thank You Sent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0
                  ? this.state.data.map((donation, index) => (
                      <tr>
                        <td>
                          {" "}
                          <Moment utc format="MM/DD/YYYY">
                            {donation.donationDate}
                          </Moment>
                        </td>
                        <td>${donation.donationAmount.toFixed(2)}</td>
                        <td>{donation.note}</td>
                        <td>{donation.thankYou ? "Yes" : "No"}</td>
                        <td style={{ marginRight: "10px" }}>
                          <Link
                            style={{ color: "black", marginRight: "10px" }}
                            title="Edit Donation"
                            style={{ color: "black" }}
                            to={{
                              pathname: `/donation/${donation.id}/edit`,
                              state: {
                                donorId: this.props.match.params.donorId,
                                donorName: this.props.location.state.donorName
                              }
                            }}
                          >
                            <FaEdit />
                          </Link>
                          <Button
                            style={{
                              marginBottom: "10px",
                              marginLeft: "10px"
                            }}
                            title="Delete Donation"
                            onClick={e =>
                              this.handleSubmit(e, donation.id, index)
                            }
                            variant="clear"
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </Card>
        </div>
        :''
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DonationList);
