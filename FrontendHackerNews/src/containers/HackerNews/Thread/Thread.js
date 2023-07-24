import CommentCard from "components/UI/CommentCard/CommentCard";
import FullComment from "components/UI/FullComment/FullComment";
import Loading from "components/UI/Loading/Loading";
import Comment from "models/Comment";
import React, { Component } from "react";
import { TextArea } from "semantic-ui-react";
import axios from "util/axios-endpoints";

export class Thread extends Component {
  state = {
    comment: null,
    replies: null,
    onPostTitle: "",
  };

  postID = this.props.match.params["postID"];
  commentID = this.props.match.params["commentID"];

  postURL = `posts/${this.postID}`;
  apiURL = `${this.postURL}/${this.commentID}`;

  handleRefresh = async () => {
    const postRes = await axios.get(this.postURL);

    if (!postRes) {
      return;
    }

    const title = postRes.data["post"]["title"];

    const comRes = await axios.get(this.apiURL);

    const rootComment = comRes.data["rootComment"];
    const replies = comRes.data["replies"];

    if (rootComment) {
      const comment = new Comment(rootComment);

      this.setState({
        comment: comment,
        onPostTitle: title,
      });
    }

    if (replies) {
      const comments = replies.map((reply) => {
        return new Comment(reply);
      });

      this.setState({
        replies: comments,
      });
    }
  };

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    if (!this.state.comment) {
      return <Loading />;
    }

    let replies = null;

    if (this.state.replies) {
      replies = this.state.replies.map((reply) => {
        return (
          <CommentCard
            key={reply.id}
            root={reply.isRoot}
            author={reply.author}
            authorURL={`/user/${reply.author}`}
            time={reply.timeOfComment}
            text={reply.text}
            replyURL={`/posts/${this.postID}/reply/${reply.id}`}
          />
        );
      });
    }

    return (
      <div>
        <FullComment
          comment={this.state.comment}
          fromPostTitle={this.state.onPostTitle}
        />
        <TextArea />
        <br />
        <button> reply </button>

        {replies}
      </div>
    );
  }
}

export default Thread;
