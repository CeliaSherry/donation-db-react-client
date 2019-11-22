// import Table from "react-bootstrap/Table";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
// import { FaEdit,FaTrash} from 'react-icons/fa';


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         getDonor: actions.getDonor,
//     }, dispatch);
// }

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    // componentWillMount() {
    //     this.props.getDonor(this.props.match.params.donorId).then(response => {
    //         this.setState({
    //             data: response.payload
    //         })
    //     })
    // }

    render() {
        return (

        <div style={{ display: "flex", justifyContent: "center" ,wifth: '80em'}}>
        <Card>

        </Card>
       
          
            </div> 

    )
    }

}

// export default connect(null, mapDispatchToProps)(Dashboard);
// export default connect(null, mapDispatchToProps)(Dashboard);