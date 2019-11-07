import React, {Component} from 'react';
import "./styles.scss";
import * as PropTypes from "prop-types";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import * as PATHS from "../../../routing/Paths";

class ChangePasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            password2: "",
            passwordsDontMatch: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    changePassword(e) {
        if (this.state.password !== this.state.password2) {
            this.setState({passwordsDontMatch: true});
        } else {
            this.setState({passwordsDontMatch: false});
            if (!this.props.isLoading) {
                const data = {
                    new_password: this.state.password,
                };
                this.props.changePassword(data, PATHS.ROOT_PATH);
            }
        }
    }

    render() {
        return (
            <div className="LoginWithEmailForm">
                <>
                    <h6>Crea una nueva contraseña</h6>
                    <input
                        autoFocus={true}
                        type="password"
                        className="form-control mb-3"
                        placeholder="Escribe tu nueva contraseña"
                        name="password"
                        onChange={this.handleInput}
                        value={this.state.password}
                    />
                    <h6>Confirma tu nueva contraseña</h6>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Escribe tu nueva contraseña"
                        name="password2"
                        onChange={this.handleInput}
                        value={this.state.password2}
                    />
                    {
                        this.props.changePasswordError
                            ?
                            <p className="instructions mt-4 text-danger">
                                {this.props.changePasswordError}
                            </p>
                            : null
                    }
                    {
                        this.state.passwordsDontMatch
                            ?
                            <p className="instructions mt-4 text-danger">
                                Las contraseñas no coinciden
                            </p>
                            : null
                    }
                    <button className="send-button"
                            disabled={!this.state.password || !this.state.password2}
                            onClick={this.changePassword}
                    >
                        {
                            this.props.isLoading
                                ?
                                <span className="text-white spinner-grow spinner-grow-sm"
                                      role="status"
                                      aria-hidden="true"
                                />
                                :
                                <span className={"text-white"}>Guardar</span>

                        }
                    </button>
                </>
            </div>
        );
    };

}

// Set propTypes
ChangePasswordForm.propTypes = {
};

// Set defaultProps
ChangePasswordForm.defaultProps = {

};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.changePasswordReducer.loading,
    changePasswordError: state.authentication.changePasswordReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    changePassword: authenticationOperations.changePassword,
};

// Export Class
const _ChangePasswordForm = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
export {_ChangePasswordForm as ChangePasswordForm};
