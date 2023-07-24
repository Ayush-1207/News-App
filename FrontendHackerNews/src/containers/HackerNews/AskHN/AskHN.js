import React, { Component } from "react";
import HackerCard from "components/UI/HackerCard/HackerCard";
let initialStoryItems = [
  {
    id: 1,
    title: "Arrested Rioters all posted on facebook, twitter. none on parler.",
    score: 222,
    url:
      "https://tbdailynews.com/review-of-arrested-rioters-shows-none-posted-about-raiding-capitol-on-parler-but-all-posted-on-facebook-twitter-instagram/",
    by: "user1",
    createdOn: Date.now(),
    descendents: 3,
  },
  {
    id: 2,
    title:
      "	Visa and Plaid Abandon Merger After Antitrust Division’s Suit to Block ",
    url:
      "https://www.justice.gov/opa/pr/visa-and-plaid-abandon-merger-after-antitrust-division-s-suit-block",
    score: 256,
    by: "user2Bama",
    createdOn: Date.now(),
    descendents: 12,
  },
  {
    id: 3,
    title: "	Distributing Mac apps outside the App Store, a quick start guide ",
    url:
      "https://rambo.codes/posts/2021-01-08-distributing-mac-apps-outside-the-app-store",
    score: 532,
    by: "user3theGreat",
    createdOn: Date.now(),
    descendents: 0,
  },
];

class AskHN extends Component {
  render() {
    const posts = initialStoryItems.map((story, sIndex) => (
      <HackerCard
        key={story.id}
        index={sIndex + 1}
        title={`Ask HN: ${story.title}`}
        url={story.url}
        score={story.score}
        author={story.by}
        timeOfPost={story.createdOn}
        noOfComments={story.descendents}
      />
    ));

    return <div>{posts}</div>;
  }
}

export default AskHN;
