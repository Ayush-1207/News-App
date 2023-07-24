import React, { Component } from "react";
import { Redirect } from "react-router";
import { Form, Grid, Input, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { fireDB, fireConsts } from "firebase.js";
import { Dimmer, Loader } from "semantic-ui-react";

class Submit extends Component {
  state = {
    title: "",
    url: "",
    text: "",
    submitted: false,
    submitting: false,
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.submitPost(this.state, this.props.user);
  };

  submitPost = () => {
    this.setState({ submitting: true });

    const { title, url, text } = this.state;
    const username = this.props.user.username;

    const postsCollection = fireDB.collection(fireConsts.postsCollection);

    postsCollection
      .add({
        author: username,
        creationDate: new Date(),
        descendents: 1,
        points: 1,
        title: title,
        url: url,
        text: text,
      })
      .then((response) => {
        this.setState({ submitted: true });
      });
  };

  render() {
    if (this.state.submitted) {
      return <Redirect to="/" />;
    }

    if (this.state.submitting) {
      return (
        <Dimmer active>
          <Loader active inline />
        </Dimmer>
      );
    }

    if (!this.props.isAuth) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            search: "?goto=submit",
          }}
        />
      );
    }

    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <label>title</label>
            <Input
              placeholder="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <label>url</label>
            <Input
              placeholder="The URL for the news"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </Form.Field>
          <p> or </p>
          <Form.Field inline>
            <label>text</label>
            <TextArea
              style={{ width: 400 }}
              rows={3}
              placeholder="what do you wish to share?"
              name="text"
              value={this.state.text}
              onInput={this.handleChange}
            />
          </Form.Field>
          <button type="submit" />
        </Form>

        <p style={{ minHeight: 150, marginTop: 40 }}>
          Leave url blank to submit a question for discussion. If there is no
          url, the text (if any) will appear at the top of the thread.
        </p>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.loggedInUser,
  };
};

export default connect(mapStateToProps)(Submit);
