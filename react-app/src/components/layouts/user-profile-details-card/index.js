import React, { Component } from "react";
import "./styles.scss";
import { Session } from "../../../state/utils/session";
import { CelebritiesMultiselect } from "../celebrities-multiselect";
import { sessionOperations } from "../../../state/ducks/session";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";
import LogoutButton from "../../containers/logout-button/logout-button";

class UserProfileDetailsCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favCelebrities: ""
    };

    this.sesion = new Session();
    this.celebritiesMultiSelectChanged = this.celebritiesMultiSelectChanged.bind(
      this
    );
    this.updateSession = this.updateSession.bind(this);
  }

  celebritiesMultiSelectChanged(value) {
    this.setState({ favCelebrities: value });
  }

  updateSession() {
    const session = this.props.sessionData;
    session.favCelebrities = this.state.favCelebrities;
    this.props.updateSession(session);
  }

  render() {
    return (
      <div className='UserProfileDetailsCardLayout'>
        <div className='f-main-padding mt-4 f-shadow rounded f-rounded'>
          <div className='row justify-content-center'>
            <div className='col-12 text-center'>
              <h6 className='mt-3 font-weight-bold border-bottom pb-3'>
                Mi Perfil
              </h6>
            </div>
            <div className='col-12 text-center p-2'>
              <img
                className='rounded-circle'
                src={
                  this.props.userInformation.picture
                    ? this.props.userInformation.picture
                    : "/assets/img/avatar-blank.png"
                }
                width={"120px"}
                alt={"avatar"}
              />
              <h5 className='font-weight-bold mt-2'>
                {this.props.session.fullName}
              </h5>
              <h6 className='mt-2'>{this.props.userInformation.email}</h6>
              {/* <h6 className='mt-2'>{this.props.session.cellphoneNumber}</h6> */}
              <LogoutButton
                redirectTo={window.location.origin + "/"}
                className='d-inline'
              >
                <small className='text-muted cursor-pointer'>
                  Cerrar sesión
                </small>
              </LogoutButton>
            </div>
            <div className='col-12 text-center'>
              <hr />
            </div>
            <div className='col-6 text-center border-right p-2'>
              <h6 className='mt-2'>Siguiendo</h6>
              <h2 className='font-weight-bold mt-4'>0</h2>
            </div>
            <div className='col-6 text-center p-2 border-left'>
              <h6 className='mt-2'>Contratos</h6>
              <h2 className='font-weight-bold mt-4'>
                {this.props.session.totalContracts}
              </h2>
            </div>
            <div className='col-12 text-center'>
              <hr />
            </div>
            <div className='col-12 text-center p-2'>
              <h6 className='font-weight-bold mt-2'>Famosos Favoritos</h6>
              <div className='mt-2 mb-2'>
                <CelebritiesMultiselect
                  currentValue={this.props.session.favCelebrities}
                  onChange={this.celebritiesMultiSelectChanged}
                />
              </div>
              <button
                className='btn btn-primary mb-4'
                onClick={this.updateSession}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

// Set propTypes
UserProfileDetailsCardLayout.propTypes = {};

// Set defaultProps
UserProfileDetailsCardLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.session.updateSessionReducer.loading,
  sessionData: state.session.getSessionReducer.data,
  updateSessionData: state.session.updateSessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  updateSession: sessionOperations.updateSession
};

// Export Class
const _UserProfileDetailsCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDetailsCardLayout);
export { _UserProfileDetailsCardLayout as UserProfileDetailsCardLayout };
