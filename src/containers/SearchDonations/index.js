import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";
import FormControl from "react-bootstrap/FormControl";

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getFilteredDonors: actions.getFilteredDonors,
        },
        dispatch
    );
}

export class SearchDonations extends Component {

    state = {
        name: "",
        month: "",
        year: "",
        thankYou:"",
        contactName: "",
        institutionName: "",
        success: false,
        submitted: false,
        visible: false,
        errorName: false,
        errorDate: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        this.props.history.push({
            pathname: `/donations?name=${this.state.name}&month=${this.state.month}&year=${this.state.year}&thanks=${this.state.thankYou}&contact=${this.state.contactName}&institution=${this.state.institutionName}`});
    }

    render() {
        const months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
        const thank = [
            'Yes', 'No'
        ]

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: "68rem" }}>
                        <Card.Header as="h5">Search Donations (All Fields Optional)</Card.Header>
                        <Card.Body>
                            <div className="Login">
                                <Form>
                                    <FormGroup bssize="large">
                                        <FormControl
                                            onChange={e =>
                                                this.setState({ name: e.target.value })
                                            }
                                            placeholder="Donor Name"
                                        />
                                    </FormGroup>
                                    <br></br>
                                    <div style = {{display: "inline-block"}}>
                                        <label style = {{float: "left", marginTop: "10px", marginRight: "10px"}}>
                                    <select  value={this.state.value}
                                             onChange={e =>this.setState({ month: e.target.value })}>
                                        <option  value="Select Month">Select Month</option>
                                        {
                                                months.map((month, index) => (
                                                    <option key = {month} value = {(index + 1).toString()}>
                                                        {month}
                                                    </option>
                                                ))
                                        }
                                    </select>
                                        </label>
                                    <FormGroup style = {{float: "left"}}>
                                        <FormControl
                                            placeholder="Donation Year"
                                            onChange={e =>
                                                this.setState({ year: e.target.value })
                                            }
                                        />
                                    </FormGroup>
                                    </div >
                                    <br></br>
                                <label>
                                    <select value={this.state.value}
                                            onChange={e =>thank.includes(e.target.value)? this.setState({ thankYou: e.target.value }): this.setState({ thankYou: ""})}>
                                        <option value="Thank You Sent">Thank You Sent</option>
                                        {
                                            thank.map(t => (
                                                <option key = {t} value = {t}>
                                                    {t}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </label>
                                    <br></br>
                                    <br></br>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                placeholder="Contact Name"
                                                onChange={e =>
                                                    this.setState({ contactName: e.target.value })
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Institution Name"
                                                onChange={e =>
                                                    this.setState({ institutionName: e.target.value })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <br></br>
                                    <Button
                                        type="submit"
                                        block
                                        bssize="large"
                                        onClick={this.handleSubmit}
                                    >
                                        Search
                                    </Button>
                                </Form>
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
)(SearchDonations);
