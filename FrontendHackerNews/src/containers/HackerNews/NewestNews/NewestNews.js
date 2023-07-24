import React, { Component } from "react";
import HackerNews from "../HackerNews";

class NewestNews extends Component {
  render() {
    return <HackerNews sortByNew={true} />;
  }
}

export default NewestNews;
