import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import FaceIcon from "material-ui/svg-icons/social/sentiment-satisfied";
import * as colors from "material-ui/styles/colors";

const testIsInvalid = value => !Boolean(value);
const initialState = {
  first: "",
  last: "",
  email: "",
  phone: "",
  country: "america",
  terms: false,
  hasAttempted: false,
  isComplete: false
};

class App extends Component {
  state = initialState;

  handleSubmit = event => {
    const { hasAttempted, isComplete, ...values } = this.state;
    const isInvalid = Object.values(values).filter(testIsInvalid).length;

    if (isInvalid) {
      this.setState({
        ...this.state,
        hasAttempted: true
      });
    } else {
      this.setState({
        ...this.state,
        isComplete: true
      });
    }

    event.preventDefault();
  };

  handleUpdate = (input, value) => {
    this.setState({
      ...this.state,
      [input]: value
    });
  };

  handleComplete = () => {
    this.setState(initialState);
  };

  render = () => {
    const {
      first,
      last,
      email,
      phone,
      country,
      terms,
      hasAttempted,
      isComplete
    } = this.state;
    return (
      <MuiThemeProvider>
        <div
          style={{
            alignItems: "start",
            background: colors.blue500,
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "50px"
          }}
        >
          <div
            style={{
              maxWidth: "500px"
            }}
          >
            <div
              style={{
                color: colors.white,
                marginBottom: "50px"
              }}
            >
              <h1>30-day free trial</h1>
              <p>
                Try every feature, add unlimited users, no credit card required
              </p>
            </div>
            <Paper
              style={{
                padding: "20px 50px 50px"
              }}
              zDepth={3}
            >
              <form onSubmit={this.handleSubmit}>
                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText="First Name"
                    type="text"
                    fullWidth
                    value={first}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(first) &&
                      "First name can't be empty"
                    }
                    onChange={e => this.handleUpdate("first", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText="Last Name"
                    type="text"
                    fullWidth
                    value={last}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(last) &&
                      "Last name can't be empty"
                    }
                    onChange={e => this.handleUpdate("last", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(email) &&
                      "Email address can't be empty"
                    }
                    onChange={e => this.handleUpdate("email", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText="Phone Number"
                    type="tel"
                    fullWidth
                    value={phone}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(phone) &&
                      "Phone number can't be empty"
                    }
                    onChange={e => this.handleUpdate("phone", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <SelectField
                    floatingLabelText="Country"
                    fullWidth
                    errorText={
                      hasAttempted &&
                      testIsInvalid(country) &&
                      "Country can't be empty"
                    }
                    value={country}
                    onChange={(e, value, payload) =>
                      this.handleUpdate("country", payload)
                    }
                  >
                    {["America", "New Zealand", "Germany", "France", "Spain"]
                      .sort()
                      .map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item.toLowerCase().replace(/ /g, "")}
                          primaryText={item}
                        />
                      ))}
                  </SelectField>
                </div>

                <div style={{ margin: "30px 0 40px" }}>
                  <Checkbox
                    label="I have read and I agree to the terms of use, privacy policy and offer details"
                    labelStyle={{
                      color:
                        hasAttempted && testIsInvalid(terms)
                          ? colors.red500
                          : "inherit"
                    }}
                    checked={terms}
                    onCheck={() => this.handleUpdate("terms", !terms)}
                  />
                </div>

                <RaisedButton
                  type="submit"
                  label="Get Started"
                  primary={true}
                  disabled={isComplete}
                  onClick={this.handleSubmit}
                />
              </form>
            </Paper>
          </div>
          {/* - - - - - - - - - - - - - - - */}
          <Dialog
            title="Check your inbox"
            actions={[
              <FlatButton
                label="Awesome"
                labelPosition="before"
                primary={true}
                icon={<FaceIcon />}
                onClick={this.handleComplete}
              />
            ]}
            modal={true}
            open={isComplete}
          >
            Confirm your email address to continue.
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;
