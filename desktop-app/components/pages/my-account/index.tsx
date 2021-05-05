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
import { getToken } from "react-app/src/state/ducks/session/actions";
import { connect } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SkeletonItems as SkeletonInformationEdit } from "desktop-app/components/user-profile/information-edit/Skeleton";

const mapStateToProps = ({ session }) => ({
  isLoadingUserData: !session.getSessionReducer.completed,
  userData: session.getSessionReducer.data,
});

const mapDispatchToProps = {
  getUserData: getToken,
};

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

type ClientProfilePageProps = {} & StateProps & DispatchProps;

function ClientProfilePage({
  getUserData,
  userData,
  isLoadingUserData,
}: ClientProfilePageProps) {
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <PageContainer>
      <PageHeading showBackButton={false}>Mi Perfil</PageHeading>
      <main className={classes("container", styles.ClientProfilePageContainer)}>
        <div className={styles.Section}>
          <Maybe it={!isLoadingUserData} orElse={<SkeletonInformationEdit />}>
            <UserInformationEdit userData={userData} />
          </Maybe>
        </div>
        <div className={styles.Section}>
          <div className={styles.GridOfSettings}>
            <UpdatePasswordForm />
            <PaymentMethodsSection />
            <SettingsUser />
            <SharingSection />
          </div>
        </div>
        <div className={styles.Section}>
          <CelebritiesFavoritesEdit />
        </div>
        <div className={styles.Section}></div>
      </main>
    </PageContainer>
  );
}

const _ClientProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientProfilePage);

export { _ClientProfilePage as ClientProfilePage };
