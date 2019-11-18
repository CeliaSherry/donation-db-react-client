
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getContacts: actions.getContacts,
    }, dispatch);
}

export class InstitutionContacts extends Component {
    constructor(props) {
        super(props)   
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getContacts(this.props.match.params.institutionId).then(response => {
            this.setState({
                data: response.payload
            })
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div>
        <div style={{ display: "left", justifyContent: "center" }}>
       
          <div style={{ width: "80em", paddingLeft: "2em" }}>
          <h3>Contacts</h3>
            <Button
              style={{ float: "right", width: "10em" , marginBottom: "10px"}}
              href="/institutions/create"
              variant="dark"
            >
              Add Contact
            </Button>
          </div>
        </div>


            {/* <div style={{ display: "flex", justifyContent: "center" }}>

                <Card style={{ width: "80em" }}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th data-field="donationAmount" data-sortable="true">Amount</th>
                                <th>Date</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.length > 0 ?

                                this.state.data.map(donation => (
                                    <tr>
                                        <td>{donation.id}</td>
                                        <td>{donation.donationAmount}</td>
                                        <td>{donation.donationDate}</td>
                                        <td>{donation.note}</td>
                                    </tr>
                                ))
                                : ''
                            }
                        </tbody>
                    </Table>
                </Card>
            </div>  */}
             </div >
    )
    }

}

export default connect(null, mapDispatchToProps)(InstitutionContacts);