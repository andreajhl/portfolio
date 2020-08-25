import React, {Component} from 'react';
import "./styles.scss"


class Stripe3dSecureIframe extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stripe3dSecureIframe">
                <iframe src={this.props.iframeUrl} width={"100%"} height={"700px"}/>
            </div>
        );
    };
}


// defaultProps
Stripe3dSecureIframe.defaultProps = {
    iframeUrl: ""
};

// Export class
export {Stripe3dSecureIframe};
