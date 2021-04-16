import { useState } from "react";
import PageContainer from "desktop-app/components/layouts/page-container";
import {
  Sidebar,
  SidebarWrapper,
  MainContent
} from "desktop-app/components/layouts/sidebar-wrapper";
import { SearchFilters } from "desktop-app/components/search/search-filters";
import { SearchResults } from "desktop-app/components/search/search-results";
import { SidebarTopBar } from "desktop-app/components/search/sidebar-top-bar";
import { MainContentTopBar } from "desktop-app/components/search/main-content-top-bar";
import styles from "./styles.module.scss";

// type SearchPageProps = {};

function SearchPage() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  function toggleSidebar() {
    setSidebarIsOpen((isOpen) => !isOpen);
  }

  return (
    <PageContainer>
      <SidebarWrapper isOpen={sidebarIsOpen}>
        <Sidebar width={358}>
          <div className={styles.SearchPageSidebar}>
            <div
              className={`${styles.SearchPageTopBar} ${styles.SearchPageSidebarTopBar}`}
            >
              <SidebarTopBar toggleSidebar={toggleSidebar} />
            </div>
            <SearchFilters />
          </div>
        </Sidebar>
        <MainContent>
          <div
            className={`${styles.SearchPageTopBar} ${styles.SearchPageMainContentTopBar}`}
          >
            <MainContentTopBar
              sidebarIsOpen={sidebarIsOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <SearchResults sidebarIsOpen={sidebarIsOpen} />
        </MainContent>
      </SidebarWrapper>
    </PageContainer>
  );
}

export { SearchPage };
