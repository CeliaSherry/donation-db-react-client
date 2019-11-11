import { Component } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import React from 'react'

export default class Nav extends Component{
    render(){
        return(
            <div className={styles.navBar}>
            {/* <Link to="/donations" className="item"> */}
            <div className={styles.navItem}>
                New Donation
            </div>
            <div className={styles.navItem}>
                Donor Information
            </div>
            {/* </Link> */}
            </div>
        )
    }
}
