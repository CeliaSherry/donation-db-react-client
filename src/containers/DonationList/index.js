import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDonationsForDonor: actions.getDonationsForDonor
    },
    dispatch
  );
}

export class DonationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.props.getDonationsForDonor(this.props.match.params.donorId).then(response => {
      this.setState({
        data: response.payload
      });
    });
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
           { this.props.location.state.donorName != null ? <h3>Donations by {this.props.location.state.donorName}</h3> : <h3>Donations</h3>}

            
            <Button
              style={{ float: "right", width: "10em", marginBottom: "10px" }}
              variant="light"
            > 
            <Link to={{pathname:`/donor/${this.props.match.params.donorId}/donation/create`, state: {donorName:this.props.location.state.donorName}}}>Add Donation</Link>
              
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th data-field="donationAmount" data-sortable="true">
                    Amount
                  </th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0
                  ? this.state.data.map(donation => (
                      <tr>
                        <td>{donation.id}</td>
                        <td>{donation.donationAmount}</td>
                        <td> <Moment  format="MM/DD/YYYY">{donation.donationDate}</Moment></td>
                        <td>{donation.note}</td>
                        <td>
                          <Button
                            style={{
                              marginBottom: "10px",
                              marginRight: "10px"
                            }}
                            href={`/donation/${donation.id}/edit`}
                            variant="clear"
                          >
                            <FaEdit />
                          </Button>
                        </td>
                        <td>
                          <FaTrash />
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DonationList);
