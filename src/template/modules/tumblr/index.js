import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as ActVideos from '../../../actions/videoTumblrActions';

import HoldOn from 'react-hold-on';
import _ from 'lodash';

import VideoPlayer from 'react-videoplayer'
import 'react-videoplayer/lib/index.css'



class Tumblr extends Component{
  
  constructor(params){
    super(params);

    this.state = {
      playlist: [],
      videoFiles: [],
      videoSrc: "",
      currentVideo: -1,
      previousButtonClassName: "",
      nextButtonClassName: ""
    }

    this.props.dispatch(ActVideos.getVideos());
    this.videoPlayerPlayNext = this.videoPlayerPlayNext.bind(this);
    this.videoPlayerPlayPrevious = this.videoPlayerPlayPrevious.bind(this);
  }
  
videoPlayerPlayNext() {
    if (this.state.currentVideo === this.state.playlist.length - 1) {
        return;
    }
    else {
        this.setState((prevState) => {
            const currentVideo = prevState.currentVideo + 1;
            const className = currentVideo === prevState.playlist.length - 1 ? "disabled" : "";
            return {
                currentVideo,
                videoSrc: prevState.playlist[currentVideo],
                nextButtonClassName: className,
                previousButtonClassName: ""
            };
        });
    }
}

videoPlayerPlayPrevious() {
    if (this.state.currentVideo === 0) {
        return;
    }
    else {
        this.setState((prevState) => {
            const currentVideo = prevState.currentVideo - 1;
            const className = currentVideo === 0 ? "disabled" : "";
            return {
                currentVideo,
                videoSrc: prevState.playlist[currentVideo],
                previousButtonClassName: className,
                nextButtonClassName: ""
            };
        });
    }
}

  componentWillReceiveProps(props) { 
    
    if(props.videos){
      let list = _.map(props.videos, (video) =>{
        return video.video_url
      })
      this.setState({playlist: list})
    }
    switch (props.nwstate) {
      case 'FETCHING':
        if(this.state.firstLoad){
          HoldOn.open({ theme: 'sk-cube-grid', message: "Carregando..." });
          
        }
        break;
      case 'FETCHED':
        //this.setState({videos:props.videos, logado: props.logado, display: true});
        this.props.dispatch(ActVideos.done());
        //ActVideos.done()
        
        break;
      case 'REJECTED':
        console.error(props.error);
        this.props.dispatch(ActVideos.done());
        //ActVideos.done()
        break;
      case 'DONE':
        HoldOn.close();
        break;
      default:
        break;
    }
    
  }
  render(){
    console.log('VIDEOS',this.state.playlist)
    
    return (
            <VideoPlayer
                videoSrc={this.state.videoSrc}
                playNext={this.videoPlayerPlayNext}
                playPrevious={this.videoPlayerPlayPrevious}
                autoPlay={true}
                playlist={this.state.playlist.length > 1}
                onEnded={this.videoPlayerPlayNext}
                defaultBrowserControls={true}
            />
    );
  }

}

export default connect((store) => {
  return {
    videos:store.videos.videos,
    video:store.videos.video,
    nwstate: store.usuarios.nwstate,
    logado: store.usuarios.usuario,
    error: store.usuarios.error
  }
})(Tumblr);
