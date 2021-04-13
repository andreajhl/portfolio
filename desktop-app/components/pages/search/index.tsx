import { sections } from "constants/celebrities-sections";
import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import { SettingsIcon } from "desktop-app/components/common/icons";
import { HomeButton } from "desktop-app/components/common/button/home-button";
import { IconButton } from "desktop-app/components/common/button/icon-button";
import Pagination from "desktop-app/components/common/pagination";
import PageContainer from "desktop-app/components/layouts/page-container";
import {
  Sidebar,
  SidebarWrapper,
  MainContent
} from "desktop-app/components/layouts/sidebar-wrapper";
import { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";

import styles from "./styles.module.scss";

type SearchPageProps = {};

function SearchPage({ ...props }: SearchPageProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  function toggleSidebar() {
    setSidebarIsOpen((isOpen) => !isOpen);
  }
  const [informationPage, setInformationPage] = useState({
    currentPage: 1,
    totalPage: 25
  });

  return (
    <PageContainer>
      <SidebarWrapper isOpen={sidebarIsOpen}>
        <Sidebar width={358}>
          <div className={styles.SearchPageSidebar}>
            <div
              className={`${styles.SearchPageTopBar} ${styles.SearchPageSidebarTopBar}`}
            >
              <h2 className={styles.SearchPageSidebarTitle}>Filtrar por</h2>
              <IconButton
                className={styles.SearchPageSidebarClose}
                onClick={toggleSidebar}
              >
                <i className="fa fa-times" />
              </IconButton>
            </div>
          </div>
        </Sidebar>
        <MainContent>
          <div
            className={`${styles.SearchPageTopBar} ${styles.SearchPageMainContentTopBar}`}
          >
            <div
              className={`container ${
                styles.SearchPageMainContentTopBarContainer
              } ${sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""}`}
            >
              <Maybe it={!sidebarIsOpen}>
                <IconButton
                  className={styles.SearchPageMainContentSidebarToggler}
                  onClick={toggleSidebar}
                >
                  <SettingsIcon />
                </IconButton>
                <HomeButton />
              </Maybe>
              <h2 style={{ marginBottom: 0 }}>Hello Content</h2>
            </div>
          </div>
          <div
            className={`container ${
              sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
            }`}
          >
            <div className={styles.SearchPageMainContentCardGrid}>
              {sections[0].celebrities.map((celebrity) => (
                <CelebrityCard
                  thumbnailHeight={230}
                  thumbnailWidth={186}
                  celebrity={celebrity}
                />
              ))}
            </div>
          </div>
          <Pagination
            onChangePage={(nextPage) =>
              setInformationPage((prevState) => ({
                ...prevState,
                currentPage: nextPage
              }))
            }
            totalPage={informationPage.totalPage}
            currentPage={informationPage.currentPage}
          />
        </MainContent>
      </SidebarWrapper>
    </PageContainer>
  );
}

export { SearchPage };
