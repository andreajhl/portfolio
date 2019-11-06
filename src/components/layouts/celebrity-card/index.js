import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


class CelebrityCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
        };

        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.goToCelebrityProfile = this.goToCelebrityProfile.bind(this);
    }

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    goToCelebrityProfile() {
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.celebrity.user.username))
    }

    render() {
        return (
            <div className="CelebrityCardLayout">
                <div className="card f-card f-rounded hover f-shadow p-2 cursor-pointer"
                     onClick={this.goToCelebrityProfile}
                >
                    <div className="text-center mx-auto">
                        <div className="f-image border f-rounded">
                            <img className="card-img-top f-rounded"
                                 alt="avatar"
                                 onLoad={this.handleImageLoaded}
                                 src={!this.state.imageLoaded ? "/assets/img/avatar-blank.png" : this.props.celebrity.avatar}
                            />
                            <small className="f-price rounded">
                                <b>{this.props.celebrity.contracts_price} USD</b>
                            </small>
                        </div>
                    </div>
                    <div className="card-body text-left pl-2 pt-2 pr-2 pb-0">
                        <small className="f-category text-muted">
                            {this.props.celebrity.category ? this.props.celebrity.category.title : null}
                        </small>
                        <h6 className="p-0 m-0">
                            <b>{this.props.celebrity.user ? this.props.celebrity.user.full_name : "--"}</b>
                        </h6>
                        <small className="text-main-color-blue">
                            <div className="hashtags">
                            {
                                this.props.celebrity.hashtags
                                    ?
                                    this.props.celebrity.hashtags.map((h, index) => {
                                        return <span key={index} style={{marginRight: "2px"}}>#{h}</span>
                                    })
                                    :
                                    <span>
                                        #{this.props.celebrity.user ? this.props.celebrity.user.full_name.trim() : null}
                                    </span>
                            }
                            </div>
                        </small>
                    </div>
                </div>
            </div>
        );
    };
}

// default props
CelebrityCardLayout.defaultProps = {
    celebrity: {
        category: {},
        user: {}
    }
};

export {CelebrityCardLayout};
