import { hirings } from "constants/hires";
import { MyHiringsCard } from "desktop-app/components/my-hirings/my-hirings-card";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({ hirings });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MyHiringsCardsSectionProps = {} & StateProps & DispatchProps;

function MyHiringsCardsSection({ hirings }: MyHiringsCardsSectionProps) {
  return (
    <div className="container">
      <MyHiringsCard contractData={hirings[0]} />
    </div>
  );
}

const _MyHiringsCardsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHiringsCardsSection);

export { _MyHiringsCardsSection as MyHiringsCardsSection };
