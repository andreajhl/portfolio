import React, {Component} from 'react';
import 'react-flags-select/scss/react-flags-select.scss';
import "./styles.scss";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {getContractCommentsData} from "../../../state/ducks/contracts/actions";

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
        getContractCommentsData(this.props.contractReference)
            .then(res => {
                this.setState({
                    commentsCount: res.count,
                })
            })
    }

    goToContract(){
        history._pushRoute(PATHS.HIRING_PREVIEW.replace(":contract_reference", this.props.contractReference))
    }

    render() {
        return (
            <div className="ContractCommentsLayout" onClick={this.goToContract}>
                <i className={'fa fa-2x fa-comment'}/>
                <small className="text-dark">{this.state.commentsCount ? this.state.commentsCount : 0}</small>
            </div>
        );
    };

}

// Set defaultProps
ContractCommentsLayout.defaultProps = {
    contractReference: "",
};
export {ContractCommentsLayout};
