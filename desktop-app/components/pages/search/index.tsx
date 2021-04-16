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
import { useEffect, useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";

import styles from "./styles.module.scss";
import { SearchFilters } from "desktop-app/components/search/search-filters";
import Badge from "desktop-app/components/common/badge";
import { OrderByDropdown } from "desktop-app/components/search/order-by-dropdown";
import { getPixelsFromViewportWidth } from "../../../../lib/utils/getPixelsFromViewportWidth";

type SearchPageProps = {};

const orderByOptions = [
  { label: "Destacados", value: "" },
  { label: "Menor a mayor precio", value: "price asc" },
  { label: "Mayor a menor precio", value: "price desc" }
];
function SearchPage({ ...props }: SearchPageProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const [celebrityCardHeight, setCelebrityCardHeight] = useState(
    getPixelsFromViewportWidth(sidebarIsOpen ? 16.83 : 18.3)
  );

  useEffect(() => {
    // Para asegurar que el valor se actualice al tener disponible el "window".
    setCelebrityCardHeight(
      getPixelsFromViewportWidth(sidebarIsOpen ? 16.83 : 18.3)
    );
  }, [sidebarIsOpen]);

  function toggleSidebar() {
    setSidebarIsOpen((isOpen) => !isOpen);
  }
  const [informationPage, setInformationPage] = useState({
    currentPage: 1,
    totalPage: 25
  });

  const [orderBy, setOrderBy] = useState(orderByOptions[0]);

  return (
    <PageContainer>
      <SidebarWrapper isOpen={sidebarIsOpen}>
        <Sidebar width={358}>
          <div className={styles.SearchPageSidebar}>
            <div
              className={`${styles.SearchPageTopBar} ${styles.SearchPageSidebarTopBar}`}
            >
              <div
                className={`${styles.SearchPageSidebarContainer} ${styles.SearchPageSidebarTopBarContainer}`}
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
            <div>
              <SearchFilters />
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
              <Badge text="Actores" onClick={() => console.log("Clicked")} />
              <OrderByDropdown
                className={styles.SearchPageOrderByDropdown}
                onChange={setOrderBy}
                selectedOption={orderBy}
                options={orderByOptions}
              />
            </div>
          </div>
          <div
            className={`container ${
              sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
            }`}
          >
            <div
              className={`${styles.SearchPageMainContentCardGrid} ${
                !sidebarIsOpen
                  ? styles.SearchPageMainContentCardGridExpanded
                  : ""
              }`}
            >
              {sections[0].celebrities.map((celebrity) => (
                <CelebrityCard
                  thumbnailHeight={celebrityCardHeight}
                  thumbnailWidth={"100%"}
                  celebrity={celebrity}
                />
              ))}
            </div>
            <div className="d-flex justify-content-center py-5">
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
            </div>
          </div>
        </MainContent>
      </SidebarWrapper>
    </PageContainer>
  );
}

export { SearchPage };
