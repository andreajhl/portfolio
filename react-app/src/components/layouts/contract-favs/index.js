import React, {Component} from 'react';
import 'react-flags-select/scss/react-flags-select.scss';
import "./styles.scss";
import {Session} from "../../../state/utils/session";
import {addOrRemoveContractLike, getContractLikesData} from "../../../state/ducks/contracts/actions";
import * as ROUTING_PATHS from "../../../routing/Paths";
import {history} from "../../../routing/History";
import * as GTM from "../../../state/utils/gtm";

class ContractFavsLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markedByMe: false,
            favCount: 0,
        };

        this.session = new Session();

        this.addOrRemoveFav = this.addOrRemoveFav.bind(this)

    }

    componentDidMount() {
        getContractLikesData(this.props.contractReference)
            .then(data => {
                this.setState({
                    ...this.state,
                    markedByMe: data.markedByMe,
                    favCount: data.count,
                });
            })
    }

    addOrRemoveFav() {
        if(this.session.getSession()) {
            addOrRemoveContractLike(this.props.contractReference)
                .then(data => {
                    this.setState({
                        ...this.state,
                        markedByMe: data.markedByMe,
                        favCount: data.count,
                    });
                    GTM.tagManagerDataLayer(
                        data.markedByMe ? "MARKED_FAV_CONTRACT" : "UNMARKED_FAV_CONTRACT",
                        {
                            ...this.state,
                            markedByMe: data.markedByMe,
                            favCount: data.count,
                            ...this.props
                        }
                    );
                })

        }else{
            localStorage.setItem("redirectTo", window.location.pathname);
            history._pushRoute(ROUTING_PATHS.SIGN_UP_PATH)
        }
    }

    render() {
        return (
            <div className="ContractFavsLayout">
                <i className={'fa fa-2x fa-heart' + (this.state.markedByMe ? " text-primary " : "")}
                   onClick={this.addOrRemoveFav}
                />
                <small className="text-dark">{this.state.favCount ? this.state.favCount : 0}</small>
            </div>
        );
    };

}

// Set defaultProps
ContractFavsLayout.defaultProps = {
    contractReference: "",
};
export {ContractFavsLayout};
