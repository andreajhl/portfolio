import React, { Component } from "react";
import { Session } from "../../../state/utils/session";
// import { CelebritiesMultiselect } from "../celebrities-multiselect";
import { sessionOperations } from "../../../state/ducks/session";
import { connect } from "react-redux";
import {
  CLIENT_HIRINGS,
  FEED_SUBSCRIPTION,
  HOME_PATH,
} from "../../../routing/Paths";
import LogoutButton from "../../containers/logout-button/logout-button";
import Router, { withRouter } from "next/router";
import Maybe from "../../common/helpers/maybe";
import { NavLink } from "../../common/routing";
import { FormattedMessage } from "react-intl";
import NotificationLangOptions from "../../containers/notification-lang-option";
import { fetchUserSubscriptionsList } from "react-app/src/state/ducks/subscriptions/actions";

class UserProfileDetailsCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favCelebrities: "",
    };

    this.sesion = new Session();
    // this.celebritiesMultiSelectChanged = this.celebritiesMultiSelectChanged.bind(
    //   this
    // );
    this.updateSession = this.updateSession.bind(this);
  }

  // celebritiesMultiSelectChanged(value) {
  //   this.setState({ favCelebrities: value });
  // }

  componentDidMount() {
    this.props.fetchUserSubscriptionsList();
  }

  logout() {
    this.sesion.removeSession();
    Router.push(HOME_PATH);
  }

  updateSession() {
    const session = this.props.sessionData;
    session.favCelebrities = this.state.favCelebrities;
    this.props.updateSession(session);
  }

  render() {
    return (
      <div className="UserProfileDetailsCardLayout">
        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
          <div className="row justify-content-center mx-0">
            <div className="col-12 text-center">
              <h6 className="mt-3 font-weight-bold border-bottom pb-3">
                <FormattedMessage defaultMessage="Mi Perfil" />
              </h6>
            </div>
            <div className="col-12 text-center p-2">
              <img
                className="rounded-circle"
                src={
                  this.props.session?.avatar
                    ? this.props.session?.avatar
                    : "/assets/img/avatar-blank.png"
                }
                width={"120px"}
                alt={"avatar"}
              />
              <h5 className="font-weight-bold mt-2">
                {this.props.session?.fullName}
              </h5>
              <h6 className="mt-2">{this.props.session?.email}</h6>
              <Maybe it={this.props.session?.cellphoneNumber}>
                <h6 className="mt-2">
                  {this.props.session?.cellphoneCode
                    ? "+" + this.props.session?.cellphoneCode
                    : null}{" "}
                  {this.props.session?.cellphoneNumber}
                </h6>
              </Maybe>
              <LogoutButton className="d-inline">
                <small className="text-muted cursor-pointer">
                  <FormattedMessage defaultMessage="Cerrar sesión" />
                </small>
              </LogoutButton>
            </div>
            <div className="col-12 text-center">
              <hr />
            </div>
            <div className="col-6 text-center border-right p-2">
              <NavLink to={FEED_SUBSCRIPTION} className="text-decoration-none">
                <h6 className="mt-2">
                  <FormattedMessage defaultMessage="Siguiendo" />
                </h6>
                <h2 className="font-weight-bold mt-4">
                  {this.props.userSubscriptionListLength}
                  {/* {this.props.userCelebrityLikesCount} */}
                </h2>
              </NavLink>
            </div>
            <div className="col-6 text-center p-2 border-left">
              <NavLink to={CLIENT_HIRINGS} className="text-decoration-none">
                <h6 className="mt-2">
                  <FormattedMessage defaultMessage="Contratos" />
                </h6>
                <h2 className="font-weight-bold mt-4">
                  {this.props.session.totalContracts}
                </h2>
              </NavLink>
            </div>
            <div className="col-12 p-5">
              <NotificationLangOptions
                currentUserLang={this.props.session?.lang}
              />
            </div>
            {/* <div className="col-12 text-center">
              <hr />
            </div>
             <div className="col-12 text-center p-2">
              <h6 className="font-weight-bold mt-2">Famosos Favoritos</h6>
              <div className="mt-2 mb-2">
                <CelebritiesMultiselect
                  currentValue={this.props.session.favCelebrities}
                  onChange={this.celebritiesMultiSelectChanged}
                />
              </div>
              <button
                className="btn btn-primary mb-4"
                onClick={this.updateSession}
              >
                Guardar
              </button>
            </div> */}
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
  userSubscriptionListLength: state.subscriptions
    .fetchUserSubscriptionsListReducer.completed
    ? state.subscriptions.fetchUserSubscriptionsListReducer.data?.length || 0
    : "",
  isLoading: state.session.updateSessionReducer.loading,
  sessionData: state.session.getSessionReducer.data,
  updateSessionData: state.session.updateSessionReducer.data,
  userCelebrityLikesCount:
    state.celebrityLikes.fetchUserCelebrityLikesReducer?.data?.data?.length ||
    0,
});

// mapStateToProps
const mapDispatchToProps = {
  fetchUserSubscriptionsList,
  updateSession: sessionOperations.updateSession,
};

// Export Class
const _UserProfileDetailsCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfileDetailsCardLayout));
export { _UserProfileDetailsCardLayout as UserProfileDetailsCardLayout };
