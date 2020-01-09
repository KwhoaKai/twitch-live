import Card from "./Card";
import React from "react";

// Container for list of cards
class AllCards extends React.Component {
  render() {
    let streamers = this.props.toRender;
    if (streamers.length > 0) {
      let rendered = streamers.map(function(streamer) {
        return <Card key={streamer.username} streamer={streamer} />;
      });
      return <React.Fragment>{rendered}</React.Fragment>;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default AllCards;
