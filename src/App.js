import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton label="Default" />
      </MuiThemeProvider>
    );
  }
}

export default App;
