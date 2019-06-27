import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Icon from "../../../assets/icon.png";
import { formatTime } from "../../../utils/helpers";

import "./Message.less";

@inject("rootStore")
@observer
export default class Message extends Component {
  constructor(props) {
    super(props);

    this.phrase = this.props.data.phrase;
    this.words = this.props.data.words;
    this.timeStart = this.props.data.timeStart;
    this.timeEnd = this.words[this.words.length - 1].timeEnd;
  }

  render() {
    const { currentTime } = this.props.rootStore.transcriptStore;
    const timeStartFormated = formatTime(this.timeStart);
    let content;

    //check current time in our time range
    if (currentTime > this.timeStart && currentTime < this.timeEnd) {
      content = this.words.map(item => {
        const styleActive =
          currentTime > item.timeStart && currentTime < item.timeEnd
            ? { backgroundColor: "lightblue" }
            : null;

        return (
          <Fragment key={item.word + item.timeEnd}>
            <span style={styleActive}>{item.word}</span>&#160;
          </Fragment>
        );
      });

    } else {
      content = this.phrase;
    }

    return (
      <div className="message-component">

        <section className="message-component--icon">
          <img src={Icon} alt="" />
        </section>

        <section className="message-component--content">
          <p className="message-component--time">{timeStartFormated}</p>
          <div className="message-component--text">{content}</div>
        </section>

      </div>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object
};
