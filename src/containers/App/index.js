import React from "react";
import { Component } from "react";

import style from "../App/style.module.css";

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.navigation}></div>
        <div className={style.main}>{this.props.children}</div>
      </div>
    );
  }
}

export default App;
