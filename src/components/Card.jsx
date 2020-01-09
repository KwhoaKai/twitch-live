import React from "react";

// Builds card from streamer info
class Card extends React.Component {
  handleClick() {
    window.open("http://go.twitch.tv/" + this.props.streamer.username);
  }
  render() {
    // console.log("making ", this.props.streamer.username, "'s card");
    return (
      <div className='container-fluid'>
        <div id={this.props.streamer.username} className='row'>
          <div className='col-md-3 col-lg-4 col-xs-1 col-sm-3'></div>
          <div className='col-md-6 col-xs-10 col-lg-4 col-sm-6'>
            <div className='row backgroundDiv'>
              <div id='profPicDiv' className='col-md-1 col-xs-1'>
                {this.props.streamer.streamPic}
              </div>
              <div className='userDiv col-md-8 col-xs-6'>
                <p id='userText'>
                  <strong>{this.props.streamer.username}</strong>
                </p>
              </div>
              <div
                id={this.props.streamer.username}
                className='twitchIconDiv col-md-1 col-xs-1'
              >
                <input
                  type='image'
                  src='https://cdn1.iconfinder.com/data/icons/simple-icons/2048/twitch-2048-black.png'
                  name='saveForm'
                  className={`btTxt submit ${this.props.streamer.fade}`}
                  id='twitchIcon'
                  onClick={e => this.handleClick(e)}
                />
              </div>
              <div className='indicator col-md-1 col-xs-1'>
                <p id='status'>
                  <strong>{this.props.streamer.liveOrNot}</strong>
                </p>
              </div>
            </div>
            <div className='col-xs-1'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
