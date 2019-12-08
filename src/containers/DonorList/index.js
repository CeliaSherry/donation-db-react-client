
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaSort } from 'react-icons/fa';

import Alert from "react-bootstrap/Alert";
import Pagination from '../../components/Pagination';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';
import Moment from "react-moment";



function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
        deleteDonor: actions.deleteDonor,
        getAllDonorsSortedAscendingName: actions.getAllDonorsSortedAscendingName,
        getAllDonorsSortedDescendingName: actions.getAllDonorsSortedDescendingName,
        getAllDonorsGroupedByContact: actions.getAllDonorsGroupedByContact
    }, dispatch);
}

export class DonorList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.elementsPerPage= 10;
        this.state = {
            data: [],
            pageOfDonor: [],
            pageNumber: 1
        }
        this.onChangePage = this.onChangePage.bind(this);
        this.onNameButtonClick = this.onNameButtonClick.bind(this);
        this.onContactButtonClick = this.onContactButtonClick.bind(this);
    }

    componentWillMount() {
        const values = queryString.parse(this.props.location.search)

        if (Object.keys(values).length === 0) {
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

    onNameButtonClick() {
        if (!this.orderNameDescending) {
            this.props.getAllDonorsSortedAscendingName().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        else{
            this.props.getAllDonorsSortedDescendingName().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        this.orderNameDescending = !this.orderNameDescending;
    }

    onContactButtonClick() {
            this.props.getAllDonorsGroupedByContact().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
    }



    onChangePage(pageOfDonor, page) {
        // update state with new page of items
        this.setState({ pageOfDonor: pageOfDonor, pageNumber: page});
    }

    handleSubmit = (e, id, index) => {
        e.preventDefault();
        const { deleteDonor } = this.props;
        deleteDonor(id).then(response => {
            this.setState({ submitted: true })
            if (response.type === 'SUCCESS') {
                this.setState({
                    success: true,
                    data: this.state.data.filter((_, i) => i !== (index + ((this.state.pageNumber - 1) * this.elementsPerPage)))
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
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                        <th>
                            <button style= {{ background: "transparent", border: "none"}} onClick={this.onNameButtonClick.bind(this)}>
                               Name <FaSort/>
                            </button>
                            </th>
                            <th>Total Amount Donated</th>
                            <th>Total Times Donated</th>
                            <th>Last Donated</th>
                            <th>
                            <button style= {{ background: "transparent", border: "none"}} onClick={this.onContactButtonClick.bind(this)}>
                                Contact <FaSort/>
                            </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.length > 0 ?
                                this.state.pageOfDonor.map((donor, index) => (
                                    <tr key={index}>
                                        <td style={{paddingTop: "15px", paddingBottom: "25px"}}><Link to={{ pathname: `/donor/${donor.id}/details`, state: { donorName: donor.donorName, timesDonated: donor.totalDonatedCount } }}>{donor.donorName}</Link></td>
                                        <td style={{paddingTop: "15px", paddingBottom: "25px"}}>${donor.totalDonated.toFixed(2)}</td>
                                        <td style={{paddingTop: "15px", paddingBottom: "25px"}}>{donor.totalDonatedCount}</td>
                                        <td style={{paddingTop: "15px", paddingBottom: "25px"}}>{donor.lastDonated ? <Moment format="MM/DD/YYYY">
                                            {donor.lastDonated}
                                        </Moment> : "--"}</td>
                                        <td style={{paddingTop: "15px", paddingBottom: "25px"}}>{donor.contact ? <Link to={{ pathname: `/contacts/${donor.contact.id}/edit` }}>{donor.contact.contactName}</Link> : "Unknown"}</td>
                                    </tr>
                                )) : ''
                        }
                        <Pagination items={this.state.data} onChangePage={this.onChangePage} elementsPerPage={this.elementsPerPage} />

                    </tbody>
                </Table>

            </div>

        );
    }

}

export default withRouter(connect(null, mapDispatchToProps)(DonorList));