import React from "react";

const CommentAdder = () => {
  const [text, setText] = React.useState("");

  handleChange = (_e, { value }) => {
    setText(value);
  };

  return (
    <p className={classes.CommentAdder}>
      <TextArea
        className={classes.AddComment}
        rows={4}
        placeholder="share your thoughts!"
        name="text"
        value={text}
        onInput={handleChange}
      />
      <button onClick={this.postCommentHandler}>add comment</button>
    </p>
  );
};

export default CommentAdder;
