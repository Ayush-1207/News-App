import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import * as util from "util/commonUtils";
import classes from "./CommentCard.module.css";

export class CommentCard extends Component {
  handleUpvote = () => {};

  handleReply = () => {};

  render() {
    const { author, authorURL, time, text, root } = this.props;
    const timeAgo = util.getTimeFromNow(time);

    return (
      <section className={root ? classes.Card : classes.Card2}>
        <small>
          <span className={classes.MetaHeadline}>
            <Button
              icon="caret up"
              size="small"
              onClick={this.handleUpvote}
              className={classes.UpvoteIcon}
            />
            <a className={classes.buttonLink} href={authorURL}>
              {" "}
              {author}{" "}
            </a>
            {timeAgo}
          </span>
        </small>
        <p>{text}</p>
        <small>
          <a className={classes.ButtonLink} href={this.props.replyURL}>
            reply
          </a>
        </small>
      </section>
    );
  }
}

export default CommentCard;
