import React from "react";
import AllCards from "./components/AllCards";
import SearchBar from "./components/SearchBar";

// Container for search bar and cards, stores user array
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Array of streaMer objects to be updated by SearchBar
      streamers: [],
      usernames: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log("mounted");
  }

  // Adds new streamer object to array
  handleSubmit(obj) {
    // console.log("adding ", obj);
    this.setState((state, props) => {
      // console.log(state.usernames);
      Object.assign(state.usernames, { name: true });
      // console.log(state.usernames);
      return {
        streamers: [obj].concat(state.streamers),
        usernames: [obj.username].concat(state.usernames)
      };
    });
  }

  render() {
    return (
      // Pass in callback to update this.state
      <React.Fragment>
        <SearchBar
          id='search'
          handleSubmit={this.handleSubmit}
          addedStreamers={this.state.usernames}
        />
        <AllCards toRender={this.state.streamers} />
      </React.Fragment>
    );
  }
}

export default App;
