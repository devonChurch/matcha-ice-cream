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
import content from "./content";

const testIsInvalid = value => !Boolean(value);
const convertCountryToValue = country =>
  country.toLowerCase().replace(/ /g, "");
const initialState = {
  first: "",
  last: "",
  email: "",
  phone: "",
  country: convertCountryToValue(content.form.country.options[0]),
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
              <h1>{content.introduction.heading}</h1>
              <p>{content.introduction.description}</p>
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
                    floatingLabelText={content.form.first.label}
                    type="text"
                    fullWidth
                    value={first}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(first) &&
                      content.form.first.error
                    }
                    onChange={e => this.handleUpdate("first", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText={content.form.last.label}
                    type="text"
                    fullWidth
                    value={last}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(last) &&
                      content.form.last.error
                    }
                    onChange={e => this.handleUpdate("last", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText={content.form.email.label}
                    type="email"
                    fullWidth
                    value={email}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(email) &&
                      content.form.email.error
                    }
                    onChange={e => this.handleUpdate("email", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <TextField
                    floatingLabelText={content.form.phone.label}
                    type="tel"
                    fullWidth
                    value={phone}
                    errorText={
                      hasAttempted &&
                      testIsInvalid(phone) &&
                      content.form.phone.error
                    }
                    onChange={e => this.handleUpdate("phone", e.target.value)}
                  />
                </div>

                <div style={{ margin: "10px 0" }}>
                  <SelectField
                    floatingLabelText={content.form.country.label}
                    fullWidth
                    errorText={
                      hasAttempted &&
                      testIsInvalid(country) &&
                      content.form.country.error
                    }
                    value={country}
                    onChange={(e, value, payload) =>
                      this.handleUpdate("country", payload)
                    }
                  >
                    {content.form.country.options
                      .sort()
                      .map((item, index) => (
                        <MenuItem
                          key={index}
                          value={convertCountryToValue(item)}
                          primaryText={item}
                        />
                      ))}
                  </SelectField>
                </div>

                <div style={{ margin: "30px 0 40px" }}>
                  <Checkbox
                    label={content.form.terms.label}
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
                  label={content.form.submit.label}
                  primary={true}
                  disabled={isComplete}
                  onClick={this.handleSubmit}
                />
              </form>
            </Paper>
          </div>
          {/* - - - - - - - - - - - - - - - */}
          <Dialog
            title={content.success.heading}
            actions={[
              <FlatButton
                label={content.success.label}
                labelPosition="before"
                primary={true}
                icon={<FaceIcon />}
                onClick={this.handleComplete}
              />
            ]}
            modal={true}
            open={isComplete}
          >
            {content.success.description}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;
