import React, { Component } from "react";
import Button from "react-bootstrap/Button";


export class Home extends Component {

    render() {
        return (
            <div>
                <div class = "text-center" style={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "40em"}}>
                        <img src="http://lakecountyunited.org/sites/default/files/logo-minus-150x121_0.gif" className="img-fluid" alt="logo"/>
                        <br/>
                        <br/>
                        <h3>Donation Database</h3>
                        <br/>
                        <Button
                            style={{ width: "10em", marginBottom: "10px", marginRight: "5px"}}
                            href="/donor/create"
                            variant="dark"
                        >
                            Add Donor
                        </Button>
                        <Button
                            style={{ width: "10em", marginBottom: "10px", marginRight: "5px"}}
                            href="/contacts/create"
                            variant="dark"
                        >
                            Add Contact
                        </Button>
                        <Button
                            style={{width: "10em", marginBottom: "10px", marginRight: "5px"}}
                            href="/institutions/create"
                            variant="dark"
                        >
                            Add Institution
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;