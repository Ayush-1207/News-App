import moment from "moment";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import classes from "./HackerCard.module.css";

class HackerCard extends Component {
  handleUpvote = () => {
    this.props.upvoteHandler(this.props.uid);
  };

  handleHide = () => {
    this.props.hideHandler(this.props.uid);
  };

  render() {
    const { title, score, url, postURL } = this.props;
    const { timeOfPost, noOfComments, index } = this.props;
    const { author, authorURL } = this.props;

    const timeFromNow = moment(timeOfPost).fromNow();

    const { hostname } = new URL(url);

    return (
      <article className={classes.Card}>
        <label className={classes.helper}>
          {index}{" "}
          <Button
            color={this.props.upvoted ? "red" : null}
            icon="caret up"
            size="small"
            onClick={this.handleUpvote}
          />
        </label>
        <div className={classes.mainContent}>
          <p>
            <a href={url}> {title} </a>
            <a href={url}> {`(${hostname})`} </a>
          </p>
          <small>
            {score} points by
            <a className={classes.buttonLink} href={authorURL}>
              {" "}
              {author}{" "}
            </a>
            {timeFromNow} |{" "}
            <button className={classes.buttonLink} onClick={this.handleHide}>
              hide
            </button>
            | <a href={postURL}> {/*noOfComments*/} comments </a>
          </small>
        </div>
      </article>
    );
  }
}

export default HackerCard;
