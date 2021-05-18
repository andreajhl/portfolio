import { CREATED } from "desktop-app/constants/contractStatuses";
import { useEffect } from "react";
import { listClientContracts } from "react-app/src/state/ducks/contracts/actions";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = ({ contracts }) => ({
  contracts:
    contracts.listClientContractsReducer.data?.filter?.(
      ({ status }) => status === CREATED
    ) || [],
  isCompleted: contracts.listClientContractsReducer.completed,
});

const mapDispatchToProps = {
  listClientContracts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ShoppingCartListProps = {} & StateProps & DispatchProps;

function ShoppingCartList({
  listClientContracts,
  contracts,
}: ShoppingCartListProps) {
  useEffect(() => {
    // GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    listClientContracts();
  }, []);

  return <div className="container">Hello</div>;
}

const _ShoppingCartList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartList);

export { _ShoppingCartList as ShoppingCartList };
