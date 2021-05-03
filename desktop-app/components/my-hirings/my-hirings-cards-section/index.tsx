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
import { hirings } from "constants/hires";
import styles from "./styles.module.scss";

const allowedStatuses = [PAYED_BY_CLIENT, COMPLETED, REJECTED, EXPIRED];

const mapStateToProps = ({ contracts }) => ({
  isLoading: contracts.listClientContractsReducer.loading,
  contracts:
    // hirings ||
    contracts.listClientContractsReducer.data?.filter?.(({ status }) =>
      allowedStatuses.includes(status)
    ) || [],
});

const mapDispatchToProps = {
  listClientContracts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MyHiringsCardsSectionProps = {} & StateProps & DispatchProps;

function MyHiringsCardsSection({
  listClientContracts,
  contracts,
}: MyHiringsCardsSectionProps) {
  useEffect(() => {
    // GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    listClientContracts();
  }, []);

  return (
    <div className="container">
      {contracts.map((contractData) => (
        <MyHiringsCard
          className={styles.MyHiringsCard}
          contractData={contractData}
        />
      ))}
    </div>
  );
}

const _MyHiringsCardsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
