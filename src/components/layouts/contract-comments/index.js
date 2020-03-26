import React, {Component} from 'react';
import 'react-flags-select/scss/react-flags-select.scss';
import "./styles.scss";
import * as TYPES from "../../../state/ducks/contracts/types";
import * as API_PATHS from "../../../state/ducks/contracts/paths";
import apiService from "../../../state/utils/apiService";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class ContractCommentsLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commentsCount: 0,
        };

        this.goToContract = this.goToContract.bind(this);

        this.session = new Session();

    }

    componentDidMount(): void {
        apiService({
            method: "GET",
            action: TYPES.COMMENT_REQUEST,
            path: "API_PATHS.CONTRACT_BASE_PATH" + this.props.contractReference + "/comments/count/",
            async: true,
            params: null,
            body: null
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    //
                } else {
                    this.setState({
                        commentsCount: res.data.count,
                    })
                }
            })
    }

    goToContract(){
        history._pushRoute(PATHS.HIRING_PREVIEW.replace(":contract_reference", this.props.contractReference))
    }

    render() {
        return (
            <div className="ContractCommentsLayout" onClick={this.goToContract}>
                <i className={'fa fa-2x fa-comment'}/>
                <small className="text-dark">{this.state.commentsCount}</small>
            </div>
        );
    };

}

// Set defaultProps
ContractCommentsLayout.defaultProps = {
    contractReference: "",
};
export {ContractCommentsLayout};
