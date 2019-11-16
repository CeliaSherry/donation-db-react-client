import { Component } from "react";
import styles from "./style.module.css";
import { Link, BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import React from 'react'
import Home from '../Home'
import CreateDonor from "../../containers/CreateDonor";

export default class Nav extends Component {
    render() {
        return (
            <Router>
                <div className={styles.navBar}>
                    <NavLink to="/">
                        <div className={styles.navItem}>
                            Home
                        </div>
                    </NavLink>

                    <NavLink to="/donations" className="item">
                        <div className={styles.navItem}>
                            New Donation
                        </div>
                    </NavLink>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/donations" component={CreateDonor}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}
