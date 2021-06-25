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
import { getReceiptsUrls } from "react-app/src/state/ducks/session/actions";
import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";

const allowedStatuses = [PAYED_BY_CLIENT, REJECTED, EXPIRED, COMPLETED];

const defaultParams = {
  pageSize: 4,
  status: allowedStatuses.join(","),
  orderBy: "created_at desc",
  currentPage: 1,
};

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
  session: { getReceiptsUrlsReducer },
}: RootState) => ({
  isCompleted:
    listUserContractsReducer.completed && getReceiptsUrlsReducer?.completed,
  contracts: (listUserContractsReducer?.data?.results ||
    []) as MyHiringsContract[],
  informationPage: listUserContractsReducer?.data?.informationPage,
});

const mapDispatchToProps = {
  listUserContracts,
  getReceiptsUrls,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type MyHiringsCardsSectionProps = {
  currentPage: number;
  orderBy: string;
  status: string;
  onChangePage: (newPage: number) => void;
} & PropsFromRedux;

function MyHiringsCardsSection({
  isCompleted,
  listUserContracts,
  getReceiptsUrls,
  contracts,
  informationPage,
  currentPage,
  orderBy,
  status,
  onChangePage,
}: MyHiringsCardsSectionProps) {
  useEffect(() => {
    const listParams = getObjectWithFallbackValues(
      {
        pageSize: 4,
        currentPage,
        orderBy,
        status,
      },
      defaultParams
    );
    listUserContracts(listParams);
  }, [currentPage, listUserContracts, orderBy, status]);

  useEffect(() => {
    getReceiptsUrls();
  }, []);

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
          onChangePage={onChangePage}
        />
      </Maybe>
    </div>
  );
}

const _MyHiringsCardsSection = connector(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
