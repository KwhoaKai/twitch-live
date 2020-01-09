import React from "react";

//  Search bar that handles AJAX calls and updates TwitchApp state
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      user: "",
      value: "",
      status: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTwitchApp = this.updateTwitchApp.bind(this);
  }

  // Passed in callback function to update parent state
  updateTwitchApp(obj) {
    this.props.handleSubmit(obj);
  }

  // Updates input text value
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  // AJAX calls to gather streamer data
  handleSubmit(event) {
    event.preventDefault();
    let liveOrNot;
    let streamPic;
    let fade;
    let username = this.state.value;
    let call1 = false;
    // First AJAX call to check streamer existence/picture
    // console.log(this.props.addedStreamers);
    if (username == "") {
      this.setState({ value: "Enter a streamer!" });
    } else if (this.props.addedStreamers.indexOf(username) != -1) {
      this.setState({ status: "Already added " + username + "!" });
    } else {
      $.ajax({
        headers: {
          "Client-ID": "xnth851asm5l3l401lvyxocfhjkhep",
          Accept: "application/vnd.twitchtv.v5+json"
        },
        url: "https://api.twitch.tv/helix/users?login=" + username,
        success: data => {
          // console.log(data);
          if (data.data.length == 0) {
            this.setState({ status: "Couldn't find that streamer!" });
          } else {
            username = data.data[0].display_name;
            if (this.props.addedStreamers.indexOf(username) != -1) {
              this.setState({ status: "Already added " + username + "!" });
            } else {
              if (data.data[0].profile_image_url == "") {
                streamPic = <div className='noPic'></div>;
                // console.log("no pic");
              } else {
                streamPic = (
                  <img
                    id='profPic'
                    src={data.data[0].profile_image_url}
                    width='60px'
                  />
                );
              }
              $.ajax({
                headers: {
                  "Client-ID": "xnth851asm5l3l401lvyxocfhjkhep",
                  Accept: "application/vnd.twitchtv.v5+json"
                },
                //url: "https://api.twitch.tv/kraken/users/?login=" + username,
                url:
                  "https://api.twitch.tv/helix/streams?user_login=" + username,
                success: data => {
                  if (data.data[0] == undefined) {
                    liveOrNot = "Offln";
                    fade = "w3-opacity-max";
                  } else {
                    liveOrNot = "Live!";
                    fade = false;
                    // console.log(data.data[0]);
                  }
                  let newStreamer = {
                    username: username,
                    streamPic: streamPic,
                    fade: fade,
                    liveOrNot: liveOrNot
                  };
                  this.updateTwitchApp(newStreamer);
                },
                error: () => {
                  // console.log("second call error");
                }
              });
            }
          }
        },
        error: () => {
          // console.log("userGet failed");
          this.setState({ status: "Couldn't find that streamer!" });
        }
      });
    }
  }

  // Render messages based on user input
  render() {
    return (
      <div id={this.props.id} className='row title'>
        <div className='col-xs-1' />
        <div align='center' className='col-xs-10'>
          <h1 id='heading'>Enter a streamer to see if they're broadcasting!</h1>
          <form id='form' onSubmit={this.handleSubmit} autoComplete='off'>
            <div>
              <input
                id='lom'
                type='text'
                placeholder='Search here :)'
                name='username'
                onChange={this.handleChange}
                value={this.state.value}
              />
            </div>
          </form>
          <button form='form' className='btn' value='Submit' type='submit'>
            :)
          </button>
          <p id='liveCheck'>{this.state.status}</p>
        </div>
        <div className='col-xs-1' />
      </div>
    );
  }
}

export default SearchBar;
