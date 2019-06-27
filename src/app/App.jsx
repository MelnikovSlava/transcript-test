import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import Dialogue from "./dialogue/Dialogue";
import AudioPlayer from "./audio-player/AudioPlayer";
import Loader from "./common/loader/Loader";

import "./App.less";

@inject("rootStore")
@observer
export default class App extends Component {
  componentDidMount() {
    this.props.rootStore.transcriptStore.fetchData();
  }

  render() {
    const { isLoading, error, record } = this.props.rootStore.transcriptStore;
    let content;

    if (isLoading) {
      content = (
        <Loader
          classNameContainer="app-component--loader-cont"
          classNameLoader="app-component--loader"
          text="Loading..."
        />
      );

    } else if (error !== null) {
      content = <p>{error}</p>;

    } else if (record !== null) {
      content = (
        <Fragment>
          <Dialogue transcript={record.transcript} name={record.name} date={record.date} />
          <AudioPlayer audio={record.audio} />
        </Fragment>
      );

    } else {
      content = <p>Empty!</p>;
    }

    return <div className="app-component">{content}</div>;
  }
}
