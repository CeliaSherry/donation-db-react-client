import React from 'react';
// import './App.css';
import { Component } from 'react';
import Navbar from '../../components/Navbar';

import { Field, reduxForm } from 'redux-form';
import style from '../App/style.module.css'




function handleSubmit() {
    console.log("hi");
};

class App extends Component {

    render() {
        console.log(style);
        return (
            <div className={style.app}>
                <div className={style.navigation}>
                    {/* <Navbar /> */}
                </div>
                <div className={style.main}>
                    {this.props.children}
                    {/* <CreateDonor></CreateDonor> */}
                </div>
            </div>
        );
    }
}

export default App;

