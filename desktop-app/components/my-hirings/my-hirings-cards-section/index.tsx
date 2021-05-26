import { MyHiringsCard } from "desktop-app/components/my-hirings/my-hirings-card";
import {
  COMPLETED,
  EXPIRED,
  PAYED_BY_CLIENT,
  REJECTED,
} from "desktop-app/constants/contractStatuses";
import { useEffect } from "react";
import { listClientContracts } from "react-app/src/state/ducks/contracts/actions";
import { connect, ConnectedProps } from "react-redux";
import styles from "./styles.module.scss";
import { MyHiringsCardSkeleton } from "desktop-app/components/my-hirings/my-hirings-card-skeleton";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { RootState } from "react-app/src/state/store";
import Pagination from "desktop-app/components/common/pagination";

const allowedStatuses = [PAYED_BY_CLIENT, COMPLETED, REJECTED, EXPIRED];

const loadingSkeletons = (
  <>
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
  </>
);

const mapStateToProps = ({ contracts }: RootState) => ({
  contracts:
    contracts.listClientContractsReducer.data?.filter?.(({ status }) =>
      allowedStatuses.includes(status)
    ) || [],
  isCompleted: contracts.listClientContractsReducer.completed,
  contractData: contracts.listClientContractsReducer,
});

const mapDispatchToProps = {
  listClientContracts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type MyHiringsCardsSectionProps = {} & PropsFromRedux;

function MyHiringsCardsSection({
  isCompleted,
  listClientContracts,
  contracts,
  contractData,
}: MyHiringsCardsSectionProps) {
  useEffect(() => {
    // GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    listClientContracts();
  }, []);

  return (
    <div className="container">
      <Maybe it={isCompleted} orElse={loadingSkeletons}>
        <div className={styles.TotalResultsCounter}>
          <p>
            Total de Solicitudes <span>{contractData?.data?.length}</span>
          </p>
        </div>
        {contracts.map((contractData: MyHiringsContract) => (
          <MyHiringsCard
            key={contractData.id}
            className={styles.MyHiringsCard}
            contractData={contractData}
          />
        ))}
        <Pagination
          className={styles.PaginationButtons}
          currentPage={1}
          totalPage={contractData?.data?.length}
          onChangePage={() => console.log("Go to new Page")}
        />
      </Maybe>
    </div>
  );
}

const _MyHiringsCardsSection = connector(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
