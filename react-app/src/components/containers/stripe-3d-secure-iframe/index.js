import React, { Component } from "react";

class Stripe3dSecureIframe extends Component {
  componentDidMount() {
    window?.scrollTo?.(0, 0);
  }

  render() {
    return (
      <div className="Stripe3dSecureIframe">
        <iframe
          title="Stripe3dSecureIframe"
          src={this.props.iframeUrl}
          width={"100%"}
          height={window?.innerHeight - 200}
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
