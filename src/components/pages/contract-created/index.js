import React, {Component} from 'react';
import "./styles.scss";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


class ContractCreatedPage extends Component {

    constructor(props) {
        super(props);

        this.state = {}

        this.goToHome = this.goToHome.bind(this);
    }

    componentWillMount(): void {
        this.props.getContract(this.props.match.params.contract_reference)
    }

    goToHome() {
        history.push(PATHS.ROOT_PATH);
    }

    render() {
        return (
            <>
                <div className="ContractCreatedPage">
                    <div className="row justify-content-center f-container"
                         style={{backgroundImage: "url('/assets/img/Pattern-Fiesta.png'), linear-gradient(180deg, #F9EF7F 0%, #E1BC29 100%)"}}>
                        <div className="col-12 col-md-4 mx-auto text-center f-card">
                            <img width="170px" src="/assets/img/dark-famosos-logo.svg" alt="avatar"/>
                            <p className="mt-4 font-weight-bold">
                                Has contratado un <br/>
                                video mensaje de <br/>
                                {this.props.contract.celebrity_name}
                            </p>
                            <div className="rounded-circle">
                                <img className="rounded-circle" src={this.props.contract.celebrity_avatar}
                                     alt="avatar"/>
                            </div>
                            <p className="mt-4 font-weight-bold">
                                {this.props.contract.celebrity_name} ya ha recibido tu <br/>
                                peticion y muy pronto recibiras tu <br/>video mensaje personalizado.
                            </p>
                            <div className="w-25 mx-auto m-4 text-center">
                                <hr style={{border: "solid 1.5px;"}}/>
                            </div>
                            <button className="btn btn-primary" onClick={this.goToHome}>
                                <i className="fa fa-arrow-left mr-2"/>
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}


// Set defaultProps
ContractCreatedPage.defaultProps = {
    contract: {celebrity: {}},
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.getContractReducer.loading,
    contract: state.contracts.getContractReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getContract: contractOperations.get,
};

// Export Class
const _ContractCreatedPage = connect(mapStateToProps, mapDispatchToProps)(ContractCreatedPage);
export {_ContractCreatedPage as ContractCreatedPage};

