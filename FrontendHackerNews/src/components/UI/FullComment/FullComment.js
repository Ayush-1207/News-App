import React from "react";
import { Icon } from "semantic-ui-react";
import * as util from "util/commonUtils";
import classes from "./FullComment.module.css";

const FullComment = (props) => {
  const { comment, fromPostTitle } = props;

  const fromPostURL = `/posts/${comment.postID}`;

  const isRoot = comment.postID === comment.parentID;

  const parentURL = isRoot
    ? `${fromPostURL}/${comment.id}`
    : `${fromPostURL}/${comment.parentID}`;

  const { timeOfComment } = comment;
  const username = comment.author;
  const commentText = comment.text;

  const timeFromNow = util.getTimeFromNow(timeOfComment);

  return (
    <div className={classes.CommentSection}>
      <Icon name="caret up" />

      <small className={classes.Context}>
        <a href={`/users/${username}`}>{username} </a>
        {timeFromNow} | <a href={parentURL}> parent </a> | on:{" "}
        <a href={fromPostURL}> {fromPostTitle} </a>
      </small>

      <section className={classes.Comment}>{commentText}</section>
    </div>
  );
};

export default FullComment;
