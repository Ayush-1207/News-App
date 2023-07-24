import Comment from "models/Comment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Dimmer, Loader, TextArea } from "semantic-ui-react";
import CommentCard from "../CommentCard/CommentCard";
import classes from "./AddCommentTo.module.css";
import axios from "util/axios-endpoints";

export class AddCommentTo extends Component {
  postID = this.props.match.params["postID"];
  replyingToCommentID = this.props.match.params["toID"];

  apiURL = `/reply/${this.replyingToCommentID}`;

  state = {
    comment: null,
    text: "",
    commented: false,
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleRefresh = () => {
    axios.get(this.apiURL).then((response) => {
      console.log("response", response);
      const comment = new Comment(response.data);
      console.log("comment", comment);

      this.setState({
        comment: comment,
      });
    });
  };

  componentDidMount() {
    if (this.postID && this.replyingToCommentID) {
      this.handleRefresh();
    }
  }

  replyHandler = () => {
    // if (!this.props.user) {
    //   return;
    // }

    const parent = this.state.comment;

    const commentConfig = {
      postID: parent.postID,
      parentID: parent.id,
      author: "guestboi",
      text: this.state.text,
      timeOfComment: new Date(),
    };

    axios.post(this.apiURL, commentConfig).then(() => {
      this.setState({
        commented: true,
      });
    });
  };

  render() {
    if (this.state.commented) {
      return <Redirect to={`/posts/${this.postID}`} />;
    }

    if (!this.state.comment) {
      return (
        <Dimmer active>
          <Loader active inline />
        </Dimmer>
      );
    }

    return (
      <div>
        <CommentCard
          id={this.state.comment.id}
          author={this.state.comment.author}
          time={this.state.comment.timeOfComment}
          text={this.state.comment.text}
          replyURL={null}
        />

        <p className={classes.CommentAdder}>
          <TextArea
            className={classes.AddComment}
            rows={4}
            placeholder="share your thoughts!"
            name="text"
            value={this.state.text}
            onInput={this.handleChange}
          />
          <button onClick={this.replyHandler}>add comment</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.loggedInUser,
  };
};
export default connect(mapStateToProps)(AddCommentTo);
