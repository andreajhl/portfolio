import React, { Component } from "react";
import "./styles.scss";

class Stripe3dSecureIframe extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="Stripe3dSecureIframe">
        <iframe
          src={this.props.iframeUrl}
          width={"100%"}
          height={window.innerHeight - 200}
          onload="resizeIframe(this);window.scrollTo(0, 0);"
        />
      </div>
    );
  }
}

// defaultProps
Stripe3dSecureIframe.defaultProps = {
  iframeUrl: ""
};

// Export class
export { Stripe3dSecureIframe };
