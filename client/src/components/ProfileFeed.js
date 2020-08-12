import React from "react";
import styled from "styled-components";
import BigTweet from "./BigTweet";

function ProfileFeed() {
  const [feed, setFeed] = React.useState([]);
  const [dataFetched, SetDataFetched] = React.useState(null);
  const [error, SetError] = React.useState("");
  React.useEffect(() => {
    SetDataFetched("loading");
    const getFeed = async () => {
      try {
        const response = await fetch("/api/treasurymog/feed", {
          method: "get",
        });
        const JSONdata = await response.json();
        const feedTweets = Object.values(JSONdata.tweetsById);
        console.log(feedTweets);
        setFeed(feedTweets);
        SetDataFetched("idle");
      } catch (err) {
        SetError("Status 404");
      }
    };
    getFeed();
  }, []);
  if (dataFetched != "idle") {
    return <p>loading...</p>;
  } else if (error == "Status 404") {
    return <p>There was an error retrieving the data.</p>;
  } else {
    return (
      <FeedContainer>
        {feed.map((item, index) => (
          <BigTweet
            key={index}
            author={item.author}
            date={item.timestamp}
            status={item.status}
            numLikes={item.numLikes}
            numRetweets={item.numRetweets}
            retweetFrom={item.retweetFrom}
            isLiked={item.isLiked}
            isRetweeted={item.isRetweeted}
            media={item.media}
          />
        ))}
      </FeedContainer>
    );
  }
}

export default ProfileFeed;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(230, 236, 240);
`;
