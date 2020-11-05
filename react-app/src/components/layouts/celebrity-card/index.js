import React, {Component, createRef} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import {connect} from "react-redux";
import {ContractPriceLayout} from "../contract-price";
import { cursorOperations } from "../../../state/ducks/cursorPosition";

class CelebrityCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
        };
        this.scrollDiv = createRef();
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.goToCelebrityProfile = this.goToCelebrityProfile.bind(this);
    }

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    goToCelebrityProfile() {
        const divScroll = this.scrollDiv.current;
        this.props.updateCursorPosition(divScroll.offsetTop)
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.celebrity.username));
        GTM.tagManagerDataLayer(
            "CLICK_ON_CELEBRITY_CARD",
            this.props.celebrity
        );
    }

    getCelebrityCountryImage() {
        const a = this.props.countries.find(x => x.alpha3Code === this.props.celebrity.country_code);
        if (a) {
            return <img src={a.alpha3Code === "USA" ? "/assets/img/usa.svg" : a.flag} alt="flag" width="17px"/>
        }
        return <span className="text-white spinner-grow spinner-grow-sm"
                     role="status"
                     aria-hidden="true"
        />
    }

    returnContractPrice(){
        if(this.props.currencyExchangeData.rate > 1){
            return (this.props.celebrity.video_message_price * this.props.currencyExchangeData.rate) + this.props.celebrity.video_message_price
        }else{
            return this.props.celebrity.video_message_price
        }
    }

    render() {
        return (
            <div className="CelebrityCardLayout" ref={this.scrollDiv}>
                <span style={{position: "fixed", top: "-1000px"}}>
                    Famosos Videos personalizados
                </span>
                <span style={{position: "fixed", top: "-1000px"}}>
                    Videos personalizados de {this.props.celebrity.full_name}
                </span>
                <span style={{position: "fixed", top: "-1000px"}}>
                    Videos personalizados de {this.props.celebrity.username}
                </span>
                <span style={{position: "fixed", top: "-1000px"}}>
                    Videos personalizados de @{this.props.celebrity.username}
                </span>
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
                            {
                                this.returnContractPrice() > 0
                                    ?
                                    <span className="f-price f-rounded f-shadow font-weight-bold">
                                        <ContractPriceLayout
                                            classes={"text-black font-weight-bold"}
                                            price={this.returnContractPrice()}
                                            currency={this.props.currencyExchangeData.to}
                                            rounding={true}
                                        />
                                    </span>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="card-body text-left pl-2 pt-2 pr-2 pb-0">
                        <div style={{overflow: "auto"}}>
                            <small className="f-category text-muted float-left">
                                {this.props.celebrity.title}
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
                                this.props.celebrity.hashtags
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
const mapStateToProps = (state) => ({
    countries: state.restCountries.fetchCountriesReducer.data,
    currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  updateCursorPosition: cursorOperations.saveCursorPosition
};

// Export Class
const _CelebrityCardLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityCardLayout);
export {_CelebrityCardLayout as CelebrityCardLayout};
