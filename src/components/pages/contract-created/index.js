import React, {Component} from 'react';
import "./styles.scss";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";


class ContractCreatedPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.goToMyHirings = this.goToMyHirings.bind(this);
        this.goToCreateAccount = this.goToCreateAccount.bind(this);

        this.session = new Session();
    }

    componentWillMount(): void {
        this.props.getClientContract(this.props.match.params.contract_reference)
    }

    goToMyHirings() {
        history._pushRoute(PATHS.CLIENT_HIRINGS);
    }

    goToCreateAccount() {
        if (this.props.contractCreated.token) {
            this.session.setSession(this.props.contractCreated.token);
            history._pushRoute(PATHS.CREATE_PASSWORD_PATH);
        } else {
            history._pushRoute(
                PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
                + "?use_email=true&email=" + this.props.contract.delivery_contact
            );
        }
    }

    goToHome(){
        history._pushRoute(PATHS.ROOT_PATH);
    }

    render() {
        const isLogged = this.session.getSession();
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
                                {this.props.contract.celebrity.full_name}
                            </p>
                            <div className="rounded-circle">
                                <img className="rounded-circle"
                                     src={this.props.isLoading ? "/assets/img/avatar-blank.png" : this.props.contract.celebrity.avatar}
                                     alt="avatar"/>
                            </div>
                            <p className="mt-4 font-weight-bold">
                                {this.props.contract.celebrity.full_name} ya ha recibido tu <br/>
                                petición y muy pronto recibirás tu <br/>video mensaje personalizado.
                            </p>
                            <div className="w-25 mx-auto m-4 text-center">
                                <hr style={{border: "solid 0.5px"}}/>
                            </div>
                            {
                                !isLogged
                                    ?
                                    <>
                                        <p className="mt-4 font-weight-bold">
                                            Estás a un paso de crear tu cuenta<br/>
                                        </p>
                                        <button className="btn btn-primary" onClick={this.goToCreateAccount}>
                                            Crear una cuenta
                                            <i className="fa fa-arrow-right ml-2"/>
                                        </button>
                                        <div className="w-25 mx-auto m-4 text-center">
                                            <hr style={{border: "solid 0.5px"}}/>
                                        </div>
                                        <div className="mt-4" onClick={this.goToHome}>
                                            <small onClick={this.goToHome}>Volver a inicio</small>
                                        </div>
                                    </>
                                    :
                                    <button className="btn btn-primary" onClick={this.goToMyHirings}>
                                        Ver mis contrataciones
                                        <i className="fa fa-arrow-right ml-2"/>
                                    </button>
                            }
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
    isLoading: state.contracts.getClientContractReducer.loading,
    contract: state.contracts.getClientContractReducer.data.contract,
    contractCreated: state.contracts.saveClientContractReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getClientContract: contractOperations.getClientContract,
};

// Export Class
const _ContractCreatedPage = connect(mapStateToProps, mapDispatchToProps)(ContractCreatedPage);
export {_ContractCreatedPage as ContractCreatedPage};

