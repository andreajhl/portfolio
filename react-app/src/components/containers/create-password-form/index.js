import React, { Component } from "react";

import * as PropTypes from "prop-types";
import { authenticationOperations } from "../../../state/ducks/authentication";
import { connect } from "react-redux";
import * as PATHS from "../../../routing/Paths";

class CreatePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      password2: "",
      passwordsDontMatch: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.createPassword = this.createPassword.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  createPassword(e) {
    if (this.state.password !== this.state.password2) {
      this.setState({ passwordsDontMatch: true });
    } else {
      this.setState({ passwordsDontMatch: false });
      if (!this.props.isLoading) {
        const data = {
          password: this.state.password
        };
        this.props.createPassword(
          data,
          PATHS.COMPLETE_PROFILE_PATH + "?email=true"
        );
      }
    }
  }

  render() {
    return (
      <div className="SignInWithEmailForm">
        <>
          <h6>Crea una contraseña para tu cuenta</h6>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Escribe tu contraseña"
            name="password"
            onChange={this.handleInput}
            value={this.state.password}
          />
          <h6>Confirma tu contraseña</h6>
          <input
            type="password"
            className="form-control"
            placeholder="Escribe tu contraseña"
            name="password2"
            onChange={this.handleInput}
            value={this.state.password2}
          />
          {this.props.createPasswordError ? (
            <p className="instructions mt-4 text-danger">
              {this.props.createPasswordError}
            </p>
          ) : null}
          {this.state.passwordsDontMatch ? (
            <p className="instructions mt-4 text-danger">
              Las contraseñas no coinciden
            </p>
          ) : null}
          <button
            className="send-button"
            disabled={!this.state.password || !this.state.password2}
            onClick={this.createPassword}
          >
            {this.props.isLoading ? (
              <span
                className="text-white spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span className={"text-white"}>Continuar</span>
            )}
          </button>
        </>
      </div>
    );
  }
}

// Set propTypes
CreatePasswordForm.propTypes = {};

// Set defaultProps
CreatePasswordForm.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.authentication.createPasswordReducer.loading,
  createPasswordError:
    state.authentication.createPasswordReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
  createPassword: authenticationOperations.createPassword
};

// Export Class
const _CreatePasswordForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePasswordForm);
export { _CreatePasswordForm as CreatePasswordForm };
