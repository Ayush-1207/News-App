import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as authActions from "store/actions/AuthAction/AuthAction";
import { Redirect } from "react-router";
import * as navPathConstants from "containers/MainApp/pathConstants";
import axios from "util/axios-endpoints";

const Auth = (props) => {
  const [isSignup, setSignup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (isSignup) {
      props.trySignUp(email, pass, username);
    } else {
      props.tryLogin(email, pass);
    }
  };

  if (props.isAuth) {
    if (props.location.search === "?goto=submit") {
      return <Redirect to={navPathConstants.submit} />;
    }
    return <Redirect to="/" />;
  }

  const handleUsernameChange = () => {
    // console.log("username", username);
    if (username === "") {
      return;
    }

    const apiURL = `/auth/${username}`;

    axios.get(apiURL).then((response) => {
      // console.log("response", response);
      if (response.data) {
        // setError("Username already exists!");
        // console.log("Username exists!");
        setError(false);
      } else {
        // console.log("All set bro!");

        setError(true);
      }
    });
  };

  return (
    <>
      <Form
        error
        size="large"
        className={classes.authForm}
        onSubmit={(event) => submitHandler(event)}
      >
        <label style={{ marginBottom: "10px" }}>
          {" "}
          {isSignup ? "Register" : "Login"}{" "}
        </label>
        <Checkbox toggle onClick={(e, data) => setSignup(data.checked)} />

        <Form.Field width={4}>
          <label>Email</label>
          <input
            placeholder="john@doe.com"
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Field>

        {isSignup ? (
          <Form.Field width={4}>
            <label>Username</label>
            <Form.Input
              fluid
              placeholder="username123"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onBlur={handleUsernameChange}
              error={
                error && {
                  content: "Username not available",
                  pointing: "left",
                }
              }
            />
          </Form.Field>
        ) : null}

        <Form.Field width={4}>
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            onChange={(event) => setPass(event.target.value)}
            value={pass}
          />
        </Form.Field>

        {isSignup ? (
          <Form.Checkbox label="I agree to the Terms and Conditions" />
        ) : null}

        <Button type="submit" disabled={error}>
          Submit
        </Button>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (email, password) =>
      dispatch(authActions.tryLogin(email, password)),
    trySignUp: (email, password, username) =>
      dispatch(authActions.trySignUp(email, password, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
