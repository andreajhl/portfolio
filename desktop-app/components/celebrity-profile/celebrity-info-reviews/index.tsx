import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

const LastReviewsModal = dynamic(() =>
  import("../../layouts/last-reviews-modal").then((mod) => mod.LastReviewsModal)
);

const mapStateToProps = ({ celebrities }: RootState) => ({
  showReviewsModal:
    celebrities.fetchReviewsReducer.data.informationPage.totalItems > 2,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CelebrityInfoReviewsProps = {
  celebrityStarsAverage: number;
} & PropsFromRedux;

function CelebrityInfoReviews({
  celebrityStarsAverage,
  showReviewsModal,
}: CelebrityInfoReviewsProps) {
  const triggerElement = (
    <span
      className={classes(
        styles.CelebrityInfoReviews,
        showReviewsModal && styles.showReviewsModal
      )}
    >
      <i className="fa fa-star text-warning" />{" "}
      <span>{Number(celebrityStarsAverage || 1).toFixed(1)}</span>
    </span>
  );

  if (!showReviewsModal) return triggerElement;

  return <LastReviewsModal>{{ triggerElement }}</LastReviewsModal>;
}

const _CelebrityInfoReviews = connector(CelebrityInfoReviews);

export { _CelebrityInfoReviews as CelebrityInfoReviews };
