import { MyHiringsCard } from "desktop-app/components/my-hirings/my-hirings-card";
import {
  COMPLETED,
  EXPIRED,
  PAYED_BY_CLIENT,
  REJECTED,
} from "desktop-app/constants/contractStatuses";
import { useEffect, useState } from "react";
import { listUserContracts } from "react-app/src/state/ducks/contracts/actions";
import { connect, ConnectedProps } from "react-redux";
import styles from "./styles.module.scss";
import { MyHiringsCardSkeleton } from "desktop-app/components/my-hirings/my-hirings-card-skeleton";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { RootState } from "react-app/src/state/store";
import Pagination from "desktop-app/components/common/pagination";
import Skeleton from "react-loading-skeleton";
import scrollToTop from "lib/utils/scrollToTop";

const allowedStatuses = [PAYED_BY_CLIENT, REJECTED, EXPIRED, COMPLETED];

const getListParams = (currentPage: number) => ({
  pageSize: 4,
  status: allowedStatuses.join(","),
  orderBy: "status desc",
  currentPage,
});

const loadingSkeletons = (
  <>
    <div className={styles.TotalResultsCounter}>
      <p>
        <Skeleton width={191} />
      </p>
      <span>
        <Skeleton width={20} />
      </span>
    </div>
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
  </>
);

const mapStateToProps = ({
  contracts: { listUserContractsReducer },
}: RootState) => ({
  isCompleted: listUserContractsReducer.completed,
  contracts: listUserContractsReducer?.data?.results as MyHiringsContract[],
  informationPage: listUserContractsReducer?.data?.informationPage,
});

const mapDispatchToProps = {
  listUserContracts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type MyHiringsCardsSectionProps = {} & PropsFromRedux;

function MyHiringsCardsSection({
  isCompleted,
  listUserContracts,
  contracts,
  informationPage,
}: MyHiringsCardsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    const listParams = getListParams(currentPage);
    listUserContracts(listParams);
  }, [currentPage]);

  function updateCurrentPage(newPage: number) {
    scrollToTop({ behavior: "auto" }); // Con "smooth" realiza un salto debido al cambio de altura.
    setCurrentPage(newPage);
  }

  return (
    <div className="container">
      <Maybe it={isCompleted} orElse={loadingSkeletons}>
        <div className={styles.TotalResultsCounter}>
          <p>Total de Solicitudes</p>
          <span>{informationPage.totalItems}</span>
        </div>
        {contracts.map((contractData) => (
          <MyHiringsCard
            key={contractData.id}
            className={styles.MyHiringsCard}
            contractData={contractData}
          />
        ))}
        <Pagination
          className={styles.PaginationButtons}
          currentPage={currentPage}
          totalPages={informationPage.totalPages}
          onChangePage={updateCurrentPage}
        />
      </Maybe>
    </div>
  );
}

const _MyHiringsCardsSection = connector(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
