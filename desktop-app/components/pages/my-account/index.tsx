import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import SettingsUser from "desktop-app/components/user-profile/settings";
import { CelebritiesFavoritesEdit } from "desktop-app/components/user-profile/celebrities-favorites";
import UserInformationEdit from "desktop-app/components/user-profile/information-edit";
import { SharingSection } from "desktop-app/components/user-profile/sharing-section";
import { PaymentMethodsSection } from "desktop-app/components/user-profile/payment-methods-section";
import UpdatePasswordForm from "desktop-app/components/user-profile/update-password-form";

function ClientProfilePage() {
  return (
    <PageContainer>
      <PageHeading showBackButton={false}>Mi Perfil</PageHeading>
      <main className={classes("container", styles.ClientProfilePageContainer)}>
        <div className={styles.Section}>
          <UserInformationEdit />
        </div>
        <div className={styles.Section}>
          <div className={styles.GridOfSettings}>
            <div>
              <UpdatePasswordForm />
            </div>
            <div>
              <PaymentMethodsSection />
            </div>
            <div>
              <SettingsUser />
            </div>
            <div>
              <SharingSection />
            </div>
          </div>
        </div>
        <div className={styles.Section}>
          <CelebritiesFavoritesEdit />
        </div>
        <div className={styles.Section}>
          
        </div>
      </main>
    </PageContainer>
  );
}

export { ClientProfilePage };
