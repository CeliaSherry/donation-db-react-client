import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from "../../components/Pagination";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllContacts: actions.getAllContacts,
      deleteContact: actions.deleteContact,
      getAllContactsSortedAscendingName:
        actions.getAllContactsSortedAscendingName,
      getAllContactsSortedDescendingName:
        actions.getAllContactsSortedDescendingName,
      getAllContactsGroupedByInstitution:
        actions.getAllContactsGroupedByInstitution,
      getAllContactsSortedAscendingState:
        actions.getAllContactsSortedAscendingState,
      getAllContactsSortedDescendingState:
        actions.getAllContactsSortedDescendingState
    },
    dispatch
  );
}

export class ContactList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.elementsPerPage = 10;
    this.state = {
      data: [],
      pageOfContact: [],
      pageNumber: 1
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onNameButtonClick = this.onNameButtonClick.bind(this);
    this.onInstitutionButtonClick = this.onInstitutionButtonClick.bind(this);
    this.onStateButtonClick = this.onStateButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.getAllContacts().then(response => {
      this.setState({
        data: response.payload
      });
    });
  }

  onChangePage(pageOfContact, page) {
    // update state with new page of items
    this.setState({ pageOfContact: pageOfContact, pageNumber: page });
  }

  onNameButtonClick() {
    if (!this.orderNameDescending) {
      this.props.getAllContactsSortedAscendingName().then(response => {
        this.setState({
          data: response.payload
        });
      });
    } else {
      this.props.getAllContactsSortedDescendingName().then(response => {
        this.setState({
          data: response.payload
        });
      });
    }
    this.orderNameDescending = !this.orderNameDescending;
  }

  onStateButtonClick() {
    if (!this.orderStateDescending) {
      this.props.getAllContactsSortedAscendingState().then(response => {
        this.setState({
          data: response.payload
        });
      });
    } else {
      this.props.getAllContactsSortedDescendingState().then(response => {
        this.setState({
          data: response.payload
        });
      });
    }
    this.orderStateDescending = !this.orderStateDescending;
  }

  onInstitutionButtonClick() {
    this.props.getAllContactsGroupedByInstitution().then(response => {
      this.setState({
        data: response.payload
      });
    });
  }

  handleSubmit = (e, id, index) => {
    e.preventDefault();
    const { deleteContact } = this.props;
    deleteContact(id).then(response => {
      this.setState({ submitted: true });
      if (response.type === "SUCCESS") {
        this.setState({
          success: true,
          data: this.state.data.filter(
            (_, i) =>
              i !== index + (this.state.pageNumber - 1) * this.elementsPerPage
          )
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
  render() {
    return (
      <div>
        <div ref={this.myRef} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.success && this.state.submitted ? (
            <Alert
              isOpen={this.state.visible}
              style={{ width: "48rem" }}
              variant="success"
            >
              {" "}
              Successful contact deletion
            </Alert>
          ) : !this.state.success && this.state.submitted ? (
            <Alert style={{ width: "48rem" }} variant="danger">
              {" "}
              Error!
            </Alert>
          ) : (
            ""
          )}
        </div>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={this.onNameButtonClick.bind(this)}
                >
                  Name <FaSort />
                </button>
              </th>
              <th>Address</th>
              <th>City</th>
              <th>
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={this.onStateButtonClick.bind(this)}
                >
                  State <FaSort />
                </button>
              </th>
              <th>Zip Code</th>
              <th>
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={this.onInstitutionButtonClick.bind(this)}
                >
                  Institution <FaSort />
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.length > 0
              ? this.state.pageOfContact.map((contact, index) => (
                  <tr key={index}>
                    <td>{contact.contactName}</td>
                    <td>{contact.address}</td>
                    <td>{contact.city}</td>
                    <td>{contact.state}</td>
                    <td>{contact.zipCode}</td>
                    <td>
                      {contact.institution
                        ? contact.institution.institutionName
                        : "Unknown"}
                    </td>
                    <td>
                      <Button
                        title="Edit"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        href={`/contacts/${contact.id}/edit`}
                        variant="clear"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        title="Delete"
                        style={{ marginBottom: "10px" }}
                        onClick={e => this.handleSubmit(e, contact.id, index)}
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
        <Pagination
          items={this.state.data}
          onChangePage={this.onChangePage}
          elementsPerPage={this.elementsPerPage}
        />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ContactList);
