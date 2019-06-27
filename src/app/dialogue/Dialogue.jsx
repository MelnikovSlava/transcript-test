import React, { Component } from "react";
import PropTypes from "prop-types";

import Message from "./message/Message";

import "./Dialogue.less";

export default class Dialogue extends Component {
  render() {
    const { transcript, name, date } = this.props;

    const content = transcript.map(item => (
      <Message key={item.phrase} data={item} />
    ));

    return (
      <div className="dialogue-component">

        <header className="dialogue-component--header">
          <h2 className="dialogue-component--title">{name}</h2>
          <p className="dialogue-component--time">{date}</p>
        </header>

        <div className="dialogue-component--container">{content}</div>

      </div>
    );
  }
}

Dialogue.propTypes = {
  transcript: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
