import React from "react";
import styled from "styled-components";
import SmallTweet from "../components/SmallTweet";
import { COLORS } from "../constants";
import { Link } from "react-router-dom";

function Feed({ addedTweet }) {
  const [dataFetched, SetDataFetched] = React.useState(null);
  const [feed, SetFeed] = React.useState([]);
  const [error, SetError] = React.useState("");

  React.useEffect(() => {
    SetDataFetched("loading");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/me/home-feed", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const JSONdata = await response.json();
        const feedTweets = Object.values(JSONdata.tweetsById);
        SetFeed(feedTweets);
        SetDataFetched("idle");
      } catch (err) {
        SetError("Status 404");
      }
    };
    fetchData();
  }, [addedTweet]);

  if (dataFetched != "idle") {
    return <p>loading...</p>;
  } else if (error == "Status 404") {
    return <p>There was an error retrieving the data.</p>;
  } else {
    return (
      <FeedContainer>
        {feed.map((item, index) => (
          <StyledLink key={index} to={`/tweet/${item.id}`}>
            <SmallTweet
              id={item.id}
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
          </StyledLink>
        ))}
      </FeedContainer>
    );
  }
}

export default Feed;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(230, 236, 240);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
