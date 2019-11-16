import React, { Component } from 'react';
import "./Home.css";


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>
                    <h2>HELLO</h2>
                    <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>

                    <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                </h1>
            </div>
        )
    }
}
export default Home;
