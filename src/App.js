import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { Component } from 'react';
import Navbar from './components/Navbar';

import { Field, reduxForm } from 'redux-form';
import CreateDonor from './components/Home';
import './App.css'


import ReduxInput from './components/Input';


function handleSubmit() {
  console.log("hi");
};

function App() {
  return (
  
    <div class="app">
      <div class="navigation">
        <Navbar />
      </div>
      <div class="main">
        <CreateDonor></CreateDonor>
      </div>
    </div>
  );
}

export default App;

