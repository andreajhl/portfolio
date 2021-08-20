import CardReview from "desktop-app/components/common/cards/review";
import React from "react";
import styles from "./styles.module.scss";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";
import { FormattedMessage } from "react-intl";
import classes from "classnames";
import { RootState } from "react-app/src/state/store";

const LastReviewsModal = dynamic(() =>
  import("../last-reviews-modal").then((mod) => mod.LastReviewsModal)
);

const mapStateToProps = ({ celebrities }: RootState) => ({
  reviews: celebrities.fetchReviewsReducer.data.results as any[],
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type LastReviewsSectionProps = {
  showMore: boolean;
  className?: string;
} & PropsFromRedux;

function LastReviewsSection({
  reviews = [],
  showMore = true,
  className,
}: LastReviewsSectionProps) {
  return (
    <Maybe it={reviews.length > 0}>
      <section className={classes(styles.LastReviewsSection, className)}>
        <h2>
          <FormattedMessage defaultMessage="Calificaciones" />
        </h2>
        <div className={styles.ReviewsCards}>
          {reviews.slice(0, 3).map((review, index) => (
            <CardReview
              key={index}
              contract_review={review.contract_review}
              user_full_name={review.user_full_name}
              contract_stars={review.contract_stars}
            />
          ))}
        </div>
        {showMore && reviews.length > 2 ? (
          <LastReviewsModal>
            {{
              triggerElement: (
                <p className={styles.SeeMoreCTA}>
                  <FormattedMessage defaultMessage="Ver todas las calificaciones" />
                </p>
              ),
            }}
          </LastReviewsModal>
        ) : null}
      </section>
    </Maybe>
  );
}

const _LastReviewsSection = connector(LastReviewsSection);

export { _LastReviewsSection as LastReviewsSection };
