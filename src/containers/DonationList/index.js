
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDonor: actions.getDonor,
    }, dispatch);
}

export class  DonationList  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getDonor(this.props.match.params.donorId).then(response => {
            this.setState({
                data: response.payload
            })
        })
    }

    render(){
    const { data } = this.state;
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
        <Table responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
{this.state.data.donations ?

    this.state.data.donations.map(donation => (
                        <tr>
                            <td>{donation.id}</td>
                            <td>{donation.donationAmount}</td>
                            <td>{donation.donationDate}</td>
                            <td>{donation.note}</td>
                        </tr>
                    ))
            :''
}
            </tbody>
        </Table>
        </Card>
        </div>
    )
}

}

export default connect(null, mapDispatchToProps)(DonationList);