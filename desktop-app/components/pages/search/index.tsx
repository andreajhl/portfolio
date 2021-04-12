import PageContainer from "desktop-app/components/layouts/page-container";
import {
  Sidebar,
  SidebarWrapper,
  MainContent
} from "desktop-app/components/sidebar-wrapper";
import { useState } from "react";
import styles from "./styles.module.scss";

type SearchPageProps = {};

function SearchPage({ ...props }: SearchPageProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  function toggleSidebar() {
    setSidebarIsOpen((isOpen) => !isOpen);
  }

  return (
    <PageContainer>
      <SidebarWrapper isOpen={sidebarIsOpen}>
        <Sidebar width={358}>
          <h2>Filtrar por</h2>
        </Sidebar>
        <MainContent>
          <div
            className={`container ${
              sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
            }`}
          >
            <h2>Hello Content</h2>
            <button type="button" onClick={toggleSidebar}>
              Toggle
            </button>
          </div>
        </MainContent>
      </SidebarWrapper>
    </PageContainer>
  );
}

export { SearchPage };
