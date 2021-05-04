import { MyHiringsCard } from "desktop-app/components/my-hirings/my-hirings-card";
import {
  COMPLETED,
  EXPIRED,
  PAYED_BY_CLIENT,
  REJECTED,
} from "desktop-app/constants/contractStatuses";
import { useEffect } from "react";
import { listClientContracts } from "react-app/src/state/ducks/contracts/actions";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { MyHiringsCardSkeleton } from "desktop-app/components/my-hirings/my-hirings-card-skeleton";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "desktop-app/components/common/helpers/maybe";

const allowedStatuses = [PAYED_BY_CLIENT, COMPLETED, REJECTED, EXPIRED];

const loadingSkeletons = (
  <>
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
    <MyHiringsCardSkeleton className={styles.MyHiringsCard} />
  </>
);

const mapStateToProps = ({ contracts }) => ({
  contracts:
    contracts.listClientContractsReducer.data?.filter?.(({ status }) =>
      allowedStatuses.includes(status)
    ) || [],
  isCompleted: contracts.listClientContractsReducer.completed,
});

const mapDispatchToProps = {
  listClientContracts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MyHiringsCardsSectionProps = {} & StateProps & DispatchProps;

function MyHiringsCardsSection({
  isCompleted,
  listClientContracts,
  contracts,
}: MyHiringsCardsSectionProps) {
  useEffect(() => {
    // GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    listClientContracts();
  }, []);

  return (
    <div className="container">
      <Maybe it={isCompleted} orElse={loadingSkeletons}>
        {contracts.map((contractData: MyHiringsContract) => (
          <MyHiringsCard
            className={styles.MyHiringsCard}
            contractData={contractData}
          />
        ))}
      </Maybe>
    </div>
  );
}

const _MyHiringsCardsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
