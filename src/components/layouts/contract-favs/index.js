import React, {Component} from 'react';
import 'react-flags-select/scss/react-flags-select.scss';
import "./styles.scss";
import * as TYPES from "../../../state/ducks/contracts/types";
import * as API_PATHS from "../../../state/ducks/contracts/paths";
import apiService from "../../../state/utils/apiService";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class ContractFavsLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFav: false,
            favCount: 0,
        };

        this.session = new Session();

        this.addOrRemoveFav = this.addOrRemoveFav.bind(this)

    }

    componentDidMount(): void {
        apiService({
            method: "GET",
            action: TYPES.FAV_REQUEST,
            path: "API_PATHS.CONTRACT_BASE_PATH" + this.props.contractReference + "/favs/",
            async: true,
            params: null,
            body: null
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    //
                } else {
                    this.setState({
                        isFav: res.data.is_fav,
                        favCount: res.data.count,
                    })
                }
            })
    }

    addOrRemoveFav() {
        if(this.session.getSession()) {
            apiService({
                method: "POST",
                action: TYPES.FAV_REQUEST,
                path: "addOrRemoveFav" + this.props.contractReference + "/favs/",
                async: true,
                params: null,
                body: null
            })
                .then(res => {
                    if ("status" in res.data && res.data.status === "ERROR") {
                        //
                    } else {
                        this.setState({
                            isFav: res.data.is_fav,
                            favCount: res.data.count,
                        })
                    }
                })
        }else{
            localStorage.setItem("redirectTo", window.location.pathname);
            history._pushRoute(PATHS.SIGN_UP_PATH)
        }
    }

    render() {
        return (
            <div className="ContractFavsLayout">
                <i className={'fa fa-2x fa-heart' + (this.state.isFav ? " text-primary " : "")}
                   onClick={this.addOrRemoveFav}
                />
                {
                    this.showCount
                    &&
                    <small className="text-dark">{this.state.favCount}</small>
                }
            </div>
        );
    };

}

// Set defaultProps
ContractFavsLayout.defaultProps = {
    contractReference: "",
    showCount: false
};
export {ContractFavsLayout};
