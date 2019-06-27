import PropTypes from "prop-types";
import * as React from "react";

import { IconLoader } from "../icons-svg/IconsSvg";

import "./Loader.less";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ finished: true }), 10);
  }

  render() {
    const {
      text = null,
      classNameLoader = "",
      classNameContainer = "",
      classNameText = ""
    } = this.props;

    if (!this.state.finished) {
      return null;
    }

    return (
      <div className={`loader-component ${classNameContainer}`}>
        <IconLoader className={`loader-component--icon ${classNameLoader}`} />
        {text !== null && <p className={classNameText}>{text}</p>}
      </div>
    );
  }
}

Loader.propTypes = {
  text: PropTypes.string,
  classNameLoader: PropTypes.string,
  classNameText: PropTypes.string,
  classNameContainer: PropTypes.string
};
