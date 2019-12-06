
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
        return (
            <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
       
          <div style={{ width: "80em", paddingLeft: "2em" }}>
          <h3>Contacts</h3>
            <Button
              style={{ float: "right", width: "10em" , marginBottom: "10px"}}
              href="/contacts/create"
              variant="dark"
            >
              Add Contact
            </Button>
          </div>
        </div>


            <div style={{ display: "flex", justifyContent: "center" }}>

                <Card style={{ width: "80em", paddingLeft:"1em" }}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.length > 0 ?

                                this.state.data.map(contact => (
                                    <tr>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.address}</td>
                                        <td>{contact.city}</td>
                                        <td>{contact.state}</td>
                                        <td>{contact.zipCode}</td>
                                    </tr>
                                ))
                                : ''
                            }
                        </tbody>
                    </Table>
                </Card>
            </div> 
             </div >
    )
    }

}

export default connect(null, mapDispatchToProps)(InstitutionContacts);