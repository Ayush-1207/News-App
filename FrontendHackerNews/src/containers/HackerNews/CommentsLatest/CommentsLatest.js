import React, { Component } from "react";
import axios from "util/axios-endpoints";
import Comment from "models/Comment";
import FullComment from "components/UI/FullComment/FullComment";

const apiURL = "/newcomments";

class CommentsLatest extends Component {
  state = {
    comments: [],
  };

  handleRefresh = () => {
    axios.get(apiURL).then((response) => {
      const commentsSorted = response.data;

      if (commentsSorted) {
        const comments = commentsSorted.map((comment) => new Comment(comment));

        this.setState({
          comments: comments,
        });
      }
    });
  };

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    const renderComments = this.state.comments.map((comment) => {
      return (
        <FullComment
          key={comment.id}
          comment={comment}
          fromPostTitle={`Post`}
        />
      );
    });

    return <div>{renderComments}</div>;
  }
}

export default CommentsLatest;
