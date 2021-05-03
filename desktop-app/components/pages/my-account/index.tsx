import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import SettingsUser from "desktop-app/components/user-profile/settings";
import { CelebritiesFavoritesEdit } from "desktop-app/components/user-profile/celebrities-favorites";
import UserInformationEdit from "desktop-app/components/user-profile/information-edit";
import { SharingSection } from "desktop-app/components/user-profile/sharing-section";

function ClientProfilePage() {
  return (
    <PageContainer>
      <PageHeading showBackButton={false}>Mi Perfil</PageHeading>
      <main className={classes("container", styles.ClientProfilePageContainer)}>
        {/* INFORMACION DE CUENTA */}
        <div className={styles.SettingsSection}>
          <UserInformationEdit />
        </div>
        {/* MULTIPLE SETTINGS */}
        <div className={styles.SettingsSection}>
          <div className={styles.GridOfSettings}>
            <div></div>
            <div></div>
            <div>
              <SettingsUser />
            </div>
            <div>
              <SharingSection />
            </div>
          </div>
        </div>

        {/* FAMOSOS FAVORITOS */}
        <div className={styles.SettingsSection}>
          <CelebritiesFavoritesEdit />
        </div>

        {/* VIDEOS FAVORITOS */}
        <div className={styles.SettingsSection}>
          <span>Seccion</span>
        </div>
      </main>
    </PageContainer>
  );
}

export { ClientProfilePage };
