import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import styles from "./styles.module.scss";
import classes from "classnames";
import SettingsUser from "desktop-app/components/user-profile/settings";
import { CelebritiesFavoritesEdit } from "desktop-app/components/user-profile/celebrities-favorites";
import UserInformationEdit from "desktop-app/components/user-profile/information-edit";
import { SharingSection } from "desktop-app/components/user-profile/sharing-section";
import { PaymentMethodsSection } from "desktop-app/components/user-profile/payment-methods-section";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SkeletonItems as SkeletonInformationEdit } from "desktop-app/components/user-profile/information-edit/Skeleton";
import { VideoContractsFavorites } from "desktop-app/components/user-profile/video-contracts-favorites";
import { FormattedMessage } from "react-intl";
import { useAuth } from "lib/famosos-auth";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  pageHeadingTitle: {
    defaultMessage: "Mi perfil",
  },
});

function ClientProfilePage() {
  const { formatMessage } = useIntl();
  const { user } = useAuth();
  const pageHeadingTitle = formatMessage(messages.pageHeadingTitle);

  return (
    <PageContainer>
      <PageHeading showBackButton={false} children={pageHeadingTitle} />
      <div className={styles.ClientProfilePage}>
        <main
          className={classes("container", styles.ClientProfilePageContainer)}
        >
          <div className={styles.Section}>
            <Maybe it={user} orElse={<SkeletonInformationEdit />}>
              <UserInformationEdit userData={user} />
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

export { ClientProfilePage };
