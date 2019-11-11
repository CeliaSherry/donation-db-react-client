import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Card from '../components/Card';
import {ReduxInput} from '../components/Input';
import style from '../components/Donor/style.module.css'


export class CreateDonor extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Card>
      <form onSubmit={handleSubmit}>
        <div className={style.formRow}>
          <Field name="firstName" label = 'First Name' component={ReduxInput} type="text"/>
        </div>
        <div>
        <div className={style.formRow}>
          <Field name="lastName" label = 'Last Name' component={ReduxInput}  type="text"/>
        </div>
        </div>
        <div>
        <div className={style.formRow}>
          <Field name="email" label = 'Email' component={ReduxInput}  type="email"/>
        </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      </Card>
    );
  }
}

// Decorate the form component
CreateDonor = reduxForm({
  form: 'CreateDonor' // a unique name for this form
})(CreateDonor);

export default CreateDonor;
