import axios from "util/axios-endpoints";
import CommentCard from "components/UI/CommentCard/CommentCard";
import HackerCard from "components/UI/HackerCard/HackerCard";
import Comment from "models/Comment";
import { constructNewPost } from "models/Post";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimmer, Loader, TextArea } from "semantic-ui-react";
import classes from "./HackerNewsItem.module.css";

class HackerNewsItem extends Component {
  postID = this.props.match.params["postID"];
  apiURL = `/posts/${this.postID}`;

  state = {
    post: null,
    comments: [],
    text: "",
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleRefresh = () => {
    axios.get(this.apiURL).then((response) => {
      console.log("response", response);

      const uglyPost = response.data["post"];
      const uglyComments = response.data["comments"];

      if (uglyPost) {
        const post = constructNewPost(uglyPost.id, uglyPost);

        this.setState({
          post: post,
          text: post.additionalText,
        });
      }

      if (uglyComments) {
        const comments = uglyComments.map((comment) => {
          return new Comment(comment);
        });

        this.setState({
          comments: comments,
        });
      }
    });
  };

  componentDidMount() {
    if (this.postID) {
      this.handleRefresh();
    }
  }

  postCommentHandler = () => {
    // if (!this.props.user) {
    //   return;
    // }

    const textCommented = this.state.text;
    const parent = this.state.post;

    const commentConfig = {
      postID: parent.id,
      parentID: parent.id,
      author: "guestboi",
      text: textCommented,
      timeOfComment: new Date(),
    };

    console.log("this.apiURL", this.apiURL);

    axios.post(this.apiURL, commentConfig).then(() => {
      this.handleRefresh();
    });
  };

  render() {
    if (!this.state.post) {
      return (
        <Dimmer active>
          <Loader active inline />
        </Dimmer>
      );
    }

    const comments = this.state.comments.map((comment) => {
      return (
        <CommentCard
          root={comment.isRoot}
          key={comment.id}
          author={comment.author}
          authorURL={`/user/${comment.author}`}
          time={comment.timeOfComment}
          text={comment.text}
          replyURL={`/posts/${this.postID}/reply/${comment.id}`}
        />
      );
    });

    const post = this.state.post;

    return (
      <div>
        <HackerCard
          uid={post.id}
          index={null}
          title={post.title}
          url={post.url}
          postURL={`/posts/${post.id}`}
          score={post.points}
          author={post.author}
          timeOfPost={post.creationDate}
          hide={true}
          past={true}
          favorite={true}
          noOfComments={post.descendents}
          redirectHandler={this.redirectHandler}
          upvoteHandler={this.upvoteHandler}
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
          <button onClick={this.postCommentHandler}>add comment</button>
        </p>

        {comments}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.loggedInUser,
  };
};

export default connect(mapStateToProps)(HackerNewsItem);
