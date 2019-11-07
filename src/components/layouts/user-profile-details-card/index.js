import React, {Component} from 'react';
import "./styles.scss";
import {Session} from "../../../state/utils/session";
import {CelebritiesMultiselect} from "../celebrities-multiselect";
import {sessionOperations} from "../../../state/ducks/session";
import {connect} from "react-redux";

class UserProfileDetailsCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fav_celebrities: ""
        };

        this.sesion = new Session();
        this.celebritiesMultiselectChanged = this.celebritiesMultiselectChanged.bind(this);
        this.logout = this.logout.bind(this);
        this.updateSession = this.updateSession.bind(this);
    }

    logout() {
        this.sesion.removeSession();
    }

    celebritiesMultiselectChanged(value){
        this.setState({fav_celebrities: value})
    }

    updateSession() {
        const session = this.props.sessionData;
        session.client.fav_celebrities = this.state.fav_celebrities;
        this.props.updateSession(session.client)
    }

    render() {
        return (
            <div className="UserProfileDetailsCardLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-5">
                        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <h4 className="mt-3 font-weight-bold border-bottom pb-3">
                                        Mi perfil
                                    </h4>
                                </div>
                                <div className="col-12 text-center p-2">
                                    <img className="rounded-circle" src="/assets/img/avatar-blank.png" width={"120px"}
                                         alt={"avatar"}/>
                                    <h5 className="font-weight-bold mt-2">{this.props.session.client ? this.props.session.client.full_name : ""}</h5>
                                    <h6 className="mt-2">{this.props.session.client ? this.props.session.client.email : ""}</h6>
                                    <h6 className="mt-2">{this.props.session.client ? this.props.session.client.cellphone_number : ""}</h6>
                                    <small className="text-muted cursor-pointer" onClick={this.logout}>Cerrar sesión
                                    </small>
                                </div>
                                <div className="col-12 text-center">
                                    <hr/>
                                </div>
                                <div className="col-6 text-center border-right p-2">
                                    <h6 className="mt-2">Siguiendo</h6>
                                    <h2 className="font-weight-bold mt-4">{this.props.session.client ? 0 : "0"}</h2>
                                </div>
                                <div className="col-6 text-center p-2 border-left">
                                    <h6 className="mt-2">Contratos</h6>
                                    <h2 className="font-weight-bold mt-4">{this.props.session.client ? this.props.session.client.total_contracts : "0"}</h2>
                                </div>
                                <div className="col-12 text-center">
                                    <hr/>
                                </div>
                                <div className="col-12 text-center p-2">
                                    <h6 className="font-weight-bold mt-2">Famosos Favoritos</h6>
                                    <div className="mt-2 mb-2">
                                        <CelebritiesMultiselect
                                            currentValue={this.props.session.client ? this.props.session.client.fav_celebrities : ""}
                                            onChange={this.celebritiesMultiselectChanged}
                                        />
                                    </div>
                                    <button className="btn btn-primary mb-4"
                                    onClick={this.updateSession}>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

// Set propTypes
UserProfileDetailsCardLayout.propTypes = {};

// Set defaultProps
UserProfileDetailsCardLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.session.updateSessionReducer.loading,
    sessionData: state.session.getSessionReducer.data,
    updateSessionData: state.session.updateSessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    updateSession: sessionOperations.updateSession
};

// Export Class
const _UserProfileDetailsCardLayout = connect(mapStateToProps, mapDispatchToProps)(UserProfileDetailsCardLayout);
export {_UserProfileDetailsCardLayout as UserProfileDetailsCardLayout};
