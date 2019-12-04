
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from '../../components/Pagination';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllContacts: actions.getAllContacts,
        deleteContact: actions.deleteContact
    }, dispatch);
}

export class ContactList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            pageOfContact: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.props.getAllContacts().then(response => {
            this.setState({
                data: response.payload
            })
        })
    }

    onChangePage(pageOfContact) {
        // update state with new page of items
        this.setState({ pageOfContact: pageOfContact });
    }

    handleSubmit = (e, id, index) => {
        e.preventDefault();
        const { deleteContact } = this.props;
        deleteContact(id).then(response => {
            this.setState({ submitted: true })
            if (response.type === 'SUCCESS') {
                this.setState({
                    success: true,
                    data: this.state.data.filter((_, i) => i !== index)
                })
            }
            if (response.type === 'FAILURE') {
                this.setState({ success: false })
            }
            setTimeout(() => {
                this.setState({ submitted: false });
            }, 3000);
        });
        window.scrollTo(0, this.myRef.current.top);

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
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Institution</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.length > 0 ?
                            this.state.pageOfContact.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.address}</td>
                                        <td>{contact.city}</td>
                                        <td>{contact.state}</td>
                                        <td>{contact.zipCode}</td>
                                        <td>Institution</td>
                                        <td>
                                            <Button
                                                title="Edit"
                                                style={{ marginBottom: "10px", marginRight: "10px" }}
                                                href={`/contacts/${contact.id}/edit`}
                                                variant="clear" >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                title="Delete"
                                                style={{ marginBottom: "10px" }}
                                                onClick={(e) => this.handleSubmit(e, contact.id, index)}
                                                variant="clear"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : ''
                        }
                    </tbody>
                </Table>
                <Pagination items={this.state.data} onChangePage={this.onChangePage} />
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(ContactList);