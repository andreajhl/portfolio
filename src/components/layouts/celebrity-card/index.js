import React, {Component} from 'react';
import "./styles.scss";

class CelebrityCardLayout extends Component {

    render() {
        return (
            <>
                <div className="card f-card f-rounded hover f-shadow p-2 cursor-pointer">
                    <div className="text-center mx-auto">
                        <div className="f-image border f-rounded">
                            <img className="card-img-top f-rounded" alt="avatar" src={this.props.celebrity.user_data.avatar}/>
                            <small className="f-price rounded">
                                <b>{this.props.celebrity.contract_price}</b>
                            </small>
                        </div>
                    </div>
                    <div className="card-body text-left pl-2 pt-2 pr-2 pb-0">
                        <small className="f-category text-muted">
                            Comediante{this.props.celebrity.user_data.category}
                        </small>
                        <h6 className="p-0 m-0">
                            <b>{this.props.celebrity.user_data.full_name}</b>
                        </h6>
                        <small className="text-main-color-blue">
                            #HashTag1 #HashTag2 #HashTag3 #HashTag4{this.props.celebrity.hashtags}
                        </small>
                    </div>
                </div>
            </>
        );
    };
}

// default props
CelebrityCardLayout.defaultProps = {
    celebrity: {}
};

export {CelebrityCardLayout};
