import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { UserProfileDetailsCardLayout } from "../../layouts/user-profile-details-card";
import { sessionOperations } from "../../../state/ducks/session";
import { authenticationOperations } from "../../../state/ducks/authentication";
import * as GTM from "../../../state/utils/gtm";
import isBrowser from "react-app/src/utils/isBrowser";

class ClientProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };
  }

  componentWillMount() {
    this.props.getToken();
  }

  async componentDidMount() {
    // document.getElementsByClassName("f-main-body")[0].style.background =
    //   "#f7f7f7";
    GTM.tagManagerDataLayer("CLIENT_PROFILE_PAGE_VIEW", this.props.session);
    this.props.getUserInformation();
  }

  // componentWillUnmount() {
  //   document.getElementsByClassName("f-main-body")[0].style.background = "#fff";
  // }

  render() {
    return (
      <>
        <div className="ClientProfilePage">
          <PageContainer applyFetchCelebrities={false}>
            <UserProfileDetailsCardLayout
              userInformation={this.props.userInformation}
              session={this.props.session}
            />
          </PageContainer>
        </div>
      </>
    );
  }
}

// Set propTypes
ClientProfilePage.propTypes = {};

// Set defaultProps
ClientProfilePage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
  session: state.session.getSessionReducer.data,
  userInformation: state.authentication.getUserInformationReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  getToken: sessionOperations.getToken,
  getUserInformation: authenticationOperations.getUserInformation
};

// Export Class
const _UserProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientProfilePage);
export { _UserProfilePage as ClientProfilePage };
