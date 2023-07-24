import React, { Component } from "react";
import HackerCard from "../../components/UI/HackerCard/HackerCard";
import { fireDB, fireConsts } from "firebase.js";
import { constructNewPost } from "models/Post";
import { connect } from "react-redux";
import firebase from "firebase";
import axios from "axios";

class HackerNews extends Component {
  state = {
    posts: [],
    loading: false,
  };

  apiURL = this.props.sortByNew
    ? "http://localhost:8080/api/newest"
    : "http://localhost:8080/api/posts";

  componentDidMount() {
    axios.get(this.apiURL).then((response) => {
      const posts = [];
      const startingPosts = response.data;

      startingPosts.forEach((post) => {
        posts.push(constructNewPost(post.id, post));
      });

      this.setState({
        posts: posts,
      });
    });
  }

  upvote = (userID, postID, isAlreadyUpvoted) => {
    // const score = isAlreadyUpvoted ? -1 : 1;
  };

  upvoteHandler = (postID) => {
    if (!this.props.user) {
      return;
    }


    const isAlreadyUpvoted = this.props.user.upvotedPosts.includes(postID);
    this.upvote(this.props.userID, postID, isAlreadyUpvoted);
  };

  hideHandler = (postID) => {
    if (!this.props.user) {
      return;
    }

    const user = fireDB
      .collection(fireConsts.usersCollection)
      .doc(this.props.userID);

    user.update({
      hiddenPosts: firebase.firestore.FieldValue.arrayUnion(postID),
    });
  };

  render() {
    let pIndex = 0;
    let isUpvoted = false;

    const posts = this.state.posts.map((post) => {
      if (this.props.user) {
        const toHide = this.props.user.hiddenPosts.includes(post.id);

        if (toHide) {
          return null;
        }

        isUpvoted = this.props.user.upvotedPosts.includes(post.id);
      }

      pIndex++;

      return (
        <HackerCard
          key={`${pIndex}${post.id}`}
          uid={post.id}
          index={pIndex}
          title={post.title}
          url={post.url}
          postURL={`/posts/${post.id}`}
          score={post.points}
          author={post.author}
          authorURL={`/user/${post.author}`}
          timeOfPost={post.creationDate}
          noOfComments={post.descendents}
          redirectHandler={this.redirectHandler}
          upvoted={isUpvoted}
          upvoteHandler={this.upvoteHandler}
          hideHandler={this.hideHandler}
        />
      );
    });

    return <div>{posts}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.loggedInUser,
    userID: state.auth.userID,
  };
};

export default connect(mapStateToProps)(HackerNews);
