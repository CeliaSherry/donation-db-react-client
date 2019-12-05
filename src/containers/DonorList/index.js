
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from '../../components/Pagination';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';
import Moment from "react-moment";



function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
        deleteDonor: actions.deleteDonor
    }, dispatch);
}

export class DonorList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            pageOfDonor: [],
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        const values = queryString.parse(this.props.location.search)

        if (Object.keys(values).length === 0) {
            console.log(Object.keys(values).length)
            this.props.getAllDonors().then(response => {
                this.setState({
                    data: response.payload
                })
            })
        }

        else {
            this.props.getAllDonors(values.name, values.email, values.phone, values.address, values.city, values.state, values.zip).then(response => {
                this.setState({
                    data: response.payload
                })
            })
        }
    }


    onChangePage(pageOfDonor) {
        // update state with new page of items
        this.setState({ pageOfDonor: pageOfDonor });
    }

    handleSubmit = (e, id, index) => {
        e.preventDefault();
        const { deleteDonor } = this.props;
        deleteDonor(id).then(response => {
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
                            <th>Total Amount Donated</th>
                            <th>Total Times Donated</th>
                            <th>Last Donated</th>
                            <th>Contact</th>
                            <th style={{ paddingLeft: "50px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.length > 0 ?
                                this.state.pageOfDonor.map((donor, index) => (
                                    <tr key={index}>
                                        <td><Link to={{ pathname: `/donor/${donor.id}/donations`, state: { donorName: donor.donorName } }}>{donor.donorName}</Link></td>
                                        <td>${donor.totalDonated}</td>
                                        <td>{donor.totalDonatedCount}</td>
                                        <td>{donor.lastDonated ? <Moment format="MM/DD/YYYY">
                                            {donor.lastDonated}
                                        </Moment> : "--"}</td>
                                        <td>{donor.contact ? <Link to={{ pathname: `/contacts/${donor.contact.id}/edit` }}>{donor.contact.contactName}</Link> : "Unknown"}</td>
                                        <td>
                                            <Link
                                                title="Add Donation"
                                                style={{ color: "black", marginLeft: "15px", marginRight: "10px" }}
                                                to={{
                                                    pathname: `/donor/${donor.id}/donation/create`,
                                                    state: { donorName: donor.donorName }
                                                }}
                                            >
                                                <FaPlus style={{ height: "32px", paddingBottom: "4px", marginRight: "10px" }} />
                                            </Link>
                                            <Button
                                                title="Edit Info"
                                                style={{ marginBottom: "10px", marginRight: "10px" }}
                                                href={`/donor/${donor.id}/edit`}
                                                variant="clear" >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                title="Delete Donor"
                                                style={{ marginBottom: "10px" }}
                                                onClick={(e) => this.handleSubmit(e, donor.id, index)}
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

export default withRouter(connect(null, mapDispatchToProps)(DonorList));