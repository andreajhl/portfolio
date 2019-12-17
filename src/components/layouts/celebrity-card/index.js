import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import {restCountriesOperations} from "../../../state/ducks/rest-countries";
import {connect} from "react-redux";
import {ContractPriceLayout} from "../contract-price";


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
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.celebrity.username));
        GTM.tagManagerDataLayer(
            "CLICK_IN_CELEBRITY_CARD",
            this.props.celebrity
        );
    }

    getCelebrityCountryImage() {
        const a = this.props.countries.find(x => x.alpha3Code === this.props.celebrity.country_code);
        if (a) {
            return <img src={a.flag} alt="flag" width="17px"/>
        }
        return <span className="text-white spinner-grow spinner-grow-sm"
                     role="status"
                     aria-hidden="true"
        />
    }

    render() {
        return (
            <div className="CelebrityCardLayout">
                <div className="card f-card f-rounded hover f-shadow p-2 cursor-pointer"
                     onClick={this.goToCelebrityProfile}
                >
                    <div
                        className={"text-center mx-auto border f-rounded " + (!this.state.imageLoaded ? " profile-section " : "")}>
                        <div className="f-image border f-rounded" style={{display: this.state.imageLoaded ? "block" : "none"}}>
                            <img className="card-img-top f-rounded"
                                 alt="avatar"
                                 onLoad={this.handleImageLoaded}
                                 src={this.props.celebrity.avatar}
                            />
                            <span className="f-price f-rounded f-shadow font-weight-bold">
                                <ContractPriceLayout classes={"text-black font-weight-bold"} price={this.props.celebrity.contracts_price} />
                            </span>
                        </div>
                    </div>
                    <div className="card-body text-left pl-2 pt-2 pr-2 pb-0">
                        <div style={{overflow: "auto"}}>
                            <small className="f-category text-muted float-left">
                                {this.props.celebrity.category}
                            </small>
                            <small className="f-category text-muted float-right">
                                {this.getCelebrityCountryImage()}
                            </small>
                        </div>
                        <h6 className="p-0 m-0">
                            <b>{this.props.celebrity.full_name}</b>
                        </h6>
                        <small className="text-main-color-blue">
                            <div className="hashtags">
                            {
                                this.props.celebrity.hashtags.length >= 1
                                    ?
                                    this.props.celebrity.hashtags.map((h, index) => {
                                        return <span key={index} style={{marginRight: "2px"}}>#{h}</span>
                                    })
                                    :
                                    <span>
                                        #{this.props.celebrity.full_name}
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
    celebrity: {}
};

// Set propTypes
CelebrityCardLayout.propTypes = {};

// Set defaultProps
CelebrityCardLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    countries: state.restCountries.fetchCountriesReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    listCountries: restCountriesOperations.list,
};

// Export Class
const _CelebrityCardLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityCardLayout);
export {_CelebrityCardLayout as CelebrityCardLayout};
