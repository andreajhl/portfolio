import React, { Component , Fragment} from 'react';
import Image from 'react-bootstrap/Image'
class index extends Component {
    render() {
        return (
            <Fragment>
                <Image roundedCircle width='162px' src={this.props.avatar} />
            </Fragment>
        );
    }
}

export default index;
