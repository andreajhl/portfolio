import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import SettingsUser from "desktop-app/components/user-profile/settings";
import { CelebritiesFavoritesEdit } from "desktop-app/components/user-profile/celebrities-favorites";
import UserInformationEdit from "desktop-app/components/user-profile/information-edit";
import { SharingSection } from "desktop-app/components/user-profile/sharing-section";
import { PaymentMethodsSection } from "desktop-app/components/user-profile/payment-methods-section";
import UpdatePasswordForm from "desktop-app/components/user-profile/update-password-form";
import { getUserAccountDetails } from "react-app/src/state/ducks/session/actions";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SkeletonItems as SkeletonInformationEdit } from "desktop-app/components/user-profile/information-edit/Skeleton";
import { VideoContractsFavorites } from "desktop-app/components/user-profile/video-contracts-favorites";
import { RootState } from "react-app/src/state/store";
import { userDetails } from "desktop-app/types/userDetails";

const mapStateToProps = (state: RootState) => ({
  isCompletedUserData: state.session.userAccountDetails.completed,
  isLoadingUserData: state.session.userAccountDetails.loading,
  userData: state.session.userAccountDetails.data as userDetails,
});

const mapDispatchToProps = {
  getUserAccountDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type ClientProfilePageProps = {} & PropsFromRedux;

function ClientProfilePage({
  userData,
  isLoadingUserData,
  isCompletedUserData,
  getUserAccountDetails,
}: ClientProfilePageProps) {
  useEffect(() => {
    getUserAccountDetails();
  }, [getUserAccountDetails]);

  return (
    <PageContainer>
      <PageHeading showBackButton={false}>Mi perfil</PageHeading>
      <div className={styles.ClientProfilePage}>
        <main
          className={classes("container", styles.ClientProfilePageContainer)}
        >
          <div className={styles.Section}>
            <Maybe
              it={isCompletedUserData && !isLoadingUserData}
              orElse={<SkeletonInformationEdit />}
            >
              <UserInformationEdit userData={userData} />
            </Maybe>
          </div>
          <div className={styles.Section}>
            <div className={styles.GridOfSettings}>
              {/* <UpdatePasswordForm /> */}
              <PaymentMethodsSection />
              <SettingsUser />
              <SharingSection />
            </div>
          </div>
          <div className={styles.Section}>
            <CelebritiesFavoritesEdit />
          </div>
          <div className={styles.Section}>
            <VideoContractsFavorites />
          </div>
        </main>
      </div>
    </PageContainer>
  );
}

const _ClientProfilePage = connector(ClientProfilePage);

export { _ClientProfilePage as ClientProfilePage };
