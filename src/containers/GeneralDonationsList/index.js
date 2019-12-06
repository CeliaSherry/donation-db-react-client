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
import queryString from "query-string";
import { withRouter } from 'react-router-dom'
import Pagination from "../../components/Pagination";
import Alert from "react-bootstrap/Alert";


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllDonations: actions.getAllDonations,
      deleteDonation: actions.deleteDonation
    },
    dispatch
  );
}

export class GeneralDonationsList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      data: [],
      pageOfDonation: []
    };
    this.onChangePage = this.onChangePage.bind(this);
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
    const values = queryString.parse(this.props.location.search)
    console.log(Object.keys(values).length)
    if (Object.keys(values).length === 0) {
      this.props.getAllDonations().then(response => {
        this.setState({
          data: response.payload
        })
      })
    } else {
      var month = 0;
      var year = 0;
      var thanks = 3;
      if (!(values.month === "")) {
        month = parseInt(values.month);
      }
      if (!(values.year === "")) {
        year = parseInt(values.year);
      }
      if (!(values.thanks === "")) {
        thanks = values.thanks === "Yes" ? 1 : 0;
      }
      this.props.getAllDonations(values.name, month, year, thanks, values.contact, values.institution).then(response => {
        this.setState({
          data: response.payload
        })
      })
    }
  }

  onChangePage(pageOfDonation) {
    // update state with new page of items
    this.setState({ pageOfDonation: pageOfDonation });
  }

  render() {
    return (
      <div>
        <div ref={this.myRef} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ?
              <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Successful donor
                deletion</Alert>
              : !this.state.success && this.state.submitted ?
                  <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
              <h3>Donations</h3>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Date</th>
                  <th data-field="donationAmount" data-sortable="true">
                    Amount
                  </th>
                  <th>Thank You Sent</th>
                  <th>Contact</th>
                  <th>Institution</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0
                  ? this.state.pageOfDonation.map((donation, index) => (
                        <tr key={index}>
                        <td>{donation.donor? <Link to={{ pathname: `/donor/${donation.donor.id}/edit` }}>{donation.donor.donorName}</Link> : "Unknown"}</td>
                        <td>
                          {" "}
                          <Moment format="MM/DD/YYYY">
                            {donation.donationDate}
                          </Moment>
                        </td>
                        <td>${donation.donationAmount}</td>
                        <td></td>
                          <td>{donation.donor.contact? <Link to={{ pathname: `/contacts/${donation.donor.contact.id}/edit` }}>{donation.donor.contact.contactName}</Link> : "Unknown"}</td>
                          <td>{donation.donor.contact && donation.donor.contact.institution? <Link to={{ pathname: `/institutions/${donation.donor.contact.institution.id}/edit` }}> {donation.donor.contact.institution.institutionName} </Link>: "Unknown"}</td>
                        <td style={{ paddingTop: "20px"}}>
                          <Link
                              title = "Edit Donation"
                            style={{ color: "black" }}
                            to={{
                              pathname: `/donation/${donation.id}/edit`,
                              state: {
                                donorId: this.props.match.params.donorId,
                                donorName: queryString.parse(this.props.location.search).name
                              }
                            }}
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td>
                          <Button
                              title = "Delete Donation"
                            style={{
                              marginBottom: "10px",
                              marginRight: "10px"
                            }}
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
            <Pagination items={this.state.data} onChangePage={this.onChangePage} />
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(GeneralDonationsList));
