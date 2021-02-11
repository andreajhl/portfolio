import React, { useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { UserProfileDetailsCardLayout } from "../../layouts/user-profile-details-card";
import { sessionOperations } from "../../../state/ducks/session";
import { authenticationOperations } from "../../../state/ducks/authentication";

const ClientProfilePage = ({ getToken }) => {
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
    return () => {
      document.getElementsByClassName("f-main-body")[0].style.background =
        "#fff";
    };
  }, []);

  return (
    <div className="ClientProfilePage">
      <PageContainer applyFetchCelebrities={false}>
        <UserProfileDetailsCardLayout
          userInformation={this.props.userInformation}
          session={this.props.session}
        />
      </PageContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session.getSessionReducer.data,
  userInformation: state.authentication.getUserInformationReducer.data
});

const mapDispatchToProps = {
  getToken: sessionOperations.getToken,
  getUserInformation: authenticationOperations.getUserInformation
};

const _UserProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientProfilePage);
export { _UserProfilePage as ClientProfilePage };
