import { useState } from "react";
import { connect } from "react-redux";
import Pagination from "../../common/pagination";
import { ResultsCardGrid } from "../results-card-grid";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchResultsProps = {
  sidebarIsOpen: boolean;
} & StateProps &
  DispatchProps;

function SearchResults({ sidebarIsOpen }: SearchResultsProps) {
  const [informationPage, setInformationPage] = useState({
    currentPage: 1,
    totalPage: 25
  });
  return (
    <main
      className={`container ${
        sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
      }`}
    >
      <ResultsCardGrid expanded={!sidebarIsOpen} />
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
    </main>
  );
}

const _SearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);

export { _SearchResults as SearchResults };
