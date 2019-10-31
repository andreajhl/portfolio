import React, {Component} from 'react';
import "./styles.scss";
import {Session} from "../../../state/utils/session";

class UserProfileDetailsCardLayout extends Component {

    constructor(props) {
        super(props);

        this.sesion = new Session();
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.sesion.removeSession();
    }

    render() {
        return (
            <div className="UserProfileDetailsCardLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-5">
                        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
                            <div className="row">
                                <div className="col-12 text-center p-2">
                                    <img className="rounded-circle" src="/assets/img/avatar-blank.png" width={"120px"}
                                         alt={"avatar"}/>
                                    <h5 className="font-weight-bold mt-2">{this.props.session.client ? this.props.session.client.full_name : ""}</h5>
                                    <h6 className="mt-2">{this.props.session.client ? this.props.session.client.email : ""}</h6>
                                    <h6 className="mt-2">{this.props.session.client ? this.props.session.client.cellphone_number : ""}</h6>
                                    <small className="text-muted cursor-pointer" onClick={this.logout}>Cerrar sesión</small>
                                </div>
                                <div className="col-12 text-center">
                                    <hr/>
                                </div>
                                <div className="col-6 text-center border-right p-2">
                                    <h6 className="mt-2">Siguiendo</h6>
                                    <h2 className="font-weight-bold mt-4">{this.props.session.client ? this.props.session.client.following : "0"}</h2>
                                </div>
                                <div className="col-6 text-center p-2 border-left">
                                    <h6 className="mt-2">Contratos</h6>
                                    <h2 className="font-weight-bold mt-4">{this.props.session.client ? this.props.session.client.contracts : "0"}</h2>
                                </div>
                                <div className="col-12 text-center">
                                    <hr/>
                                </div>
                                <div className="col-12 text-center p-2">
                                    <h6 className="font-weight-bold mt-2">Famosos Favoritos</h6>
                                    <div className="mt-2 mb-2">
                                        <textarea style={{
                                            width: "80%",
                                            border: "solid #eee"
                                        }}>{this.props.session.client ? this.props.session.client.fav_celebrities : ""}</textarea>
                                    </div>
                                    <button className="btn btn-primary mb-4">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

//default props

UserProfileDetailsCardLayout.defaultProps = {
    session: {}
};
export {UserProfileDetailsCardLayout};
