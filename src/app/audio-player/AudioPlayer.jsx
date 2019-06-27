import React, { Component } from "react";
import ReactSlider from "react-slider";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import { formatTime } from "../../utils/helpers";
import { IconPause, IconPlay } from "../common/icons-svg/IconsSvg";

import "./AudioPlayer.less";

@inject("rootStore")
@observer
export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.audio = null;
    this.timerId = null;
    this.updateFrencInMs = 100;

    this.state = {
      playing: false,
      duration: null,
      isCanPlay: false
    };
  }

  togglePlay = () => {
    if (this.state.playing) {
      this.updateProgressStop();
      this.audio.pause();
      this.setState({ playing: false });

    } else {
      this.audio.play().then(() => {
        this.updateProgressStart();
        this.setState({ playing: true });
      });
    }
  };

  // internal event "onTimeUpdate" is very slow (3-4 events per sec), use it
  updateProgressStart = () => {
    const checkTimeLoop = () => {
      this.props.rootStore.transcriptStore.changeCurrentTime(
        this.audio.currentTime
      );

      this.timerId = setTimeout(checkTimeLoop, this.updateFrencInMs);
    };

    this.timerId = setTimeout(checkTimeLoop, this.updateFrencInMs);
  };

  updateProgressStop = () => {
    clearTimeout(this.timerId);
  };

  endedAudio = () => {
    this.audio.currentTime = 0;
    this.setState({ playing: false });

    this.props.rootStore.transcriptStore.changeCurrentTime(0);
  };

  loadedMetadata = () => {
    this.setState({ duration: this.audio.duration });
  };

  changeTime = time => {
    if (!this.state.playing) {
      this.audio.pause();
    }

    this.audio.currentTime = time;
    this.props.rootStore.transcriptStore.changeCurrentTime(time);
  };

  canPlay = () => {
    this.setState({ isCanPlay: true });
  };

  render() {
    const { duration, playing, isCanPlay } = this.state;
    const { audio } = this.props;
    const { currentTime } = this.props.rootStore.transcriptStore;

    const playPauseIcon = playing
      ? <IconPause className="audio-player-component--icon" />
      : <IconPlay className="audio-player-component--icon" />;

    return (
      <div className="audio-player-component" disabled={true}>

        <button
          className="audio-player-component--btn"
          onClick={this.togglePlay}
          disabled={!isCanPlay}
        >
          {playPauseIcon}
        </button>

        <ReactSlider
          disabled={!isCanPlay}
          value={currentTime ? currentTime : 0}
          min={0}
          step={0.1}
          max={duration ? duration : 0}
          withBars={true}
          className={"audio-player-component--slider"}
          barClassName={"audio-player-component--bar"}
          handleClassName={"audio-player-component--handle"}
          onChange={this.changeTime}
        />

        <section className="audio-player-component--time">
          <span>{currentTime ? formatTime(currentTime) : "0:00"}</span>
          <span>/</span>
          <span>{duration ? formatTime(duration) : "0:00"}</span>
        </section>

        <audio
          ref={ref => (this.audio = ref)}
          onEnded={this.endedAudio}
          onLoadedMetadata={this.loadedMetadata}
          onCanPlay={this.canPlay}
        >
          <source src={audio} type="audio/mpeg" />
        </audio>

      </div>
    );
  }
}

AudioPlayer.propTypes = {
  audio: PropTypes.string.isRequired
};
