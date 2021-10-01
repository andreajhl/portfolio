import PageContainer from "desktop-app/components/layouts/page-container";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ReferralsPageHeading } from "react-app/src/components/layouts/referrals-page-heading";
import { ReferralsListItem } from "react-app/src/components/referrals-list/referrals-list-item";
import { Link } from "../../common/routing/link";
import { REFERRALS_HOME } from "constants/paths";
import classes from "classnames";
import Maybe from "../../common/helpers/maybe";
import useGetUserReferralsList from "lib/hooks/useGetUserReferralsList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import { ReferralsListItemSkeleton } from "../../referrals-list/referrals-list-item/skeleton";

const loadingSkeletons = getArrayOfLength(2).map(() => (
  <ReferralsListItemSkeleton className={styles.ReferralsListPageListItem} />
));

const initialOffset = 0;
const resultsLimit = 4;

function ReferralsListPage() {
  const [offset, setOffset] = useState(initialOffset);
  const { referrals, status, totalResults } = useGetUserReferralsList({
    offset,
    limit: resultsLimit,
  });

  const isLoading = status === "loading";
  const hasResults = totalResults > 0;
  const isFetchingFirstResults = isLoading && offset === initialOffset;
  const showResultsList = isFetchingFirstResults || hasResults;

  function fetchMoreReferrals() {
    const nextOffset = offset + resultsLimit;
    const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
    setOffset(newOffset);
  }

  return (
    <PageContainer showSearch={false}>
      <main className={styles.ReferralsListPage}>
        <div className="container">
          <ReferralsPageHeading
            showBackToReferralsHomeButton
            title={<FormattedMessage defaultMessage="MIS REFERIDOS" />}
          />
          <Maybe
            it={showResultsList}
            orElse={
              <section className={styles.NoReferralsBannerSection}>
                <div className={styles.NoReferralsBanner}>
                  <FormattedMessage defaultMessage="Parece que aún no has referido a nadie." />
                </div>
                <Link
                  href={REFERRALS_HOME}
                  className={classes(
                    "btn btn-primary",
                    styles.NoReferralsBackButton
                  )}
                >
                  <FormattedMessage defaultMessage="Volver" />
                </Link>
              </section>
            }
          >
            <section className={styles.ReferralsListPageList}>
              <Maybe it={!isLoading} orElse={loadingSkeletons}>
                <InfiniteScroll
                  dataLength={referrals.length}
                  next={fetchMoreReferrals}
                  hasMore={totalResults > referrals.length}
                  loader={loadingSkeletons}
                >
                  {referrals.map((referral) => (
                    <ReferralsListItem
                      key={referral.email}
                      referral={referral}
                      className={styles.ReferralsListPageListItem}
                    />
                  ))}
                </InfiniteScroll>
              </Maybe>
            </section>
          </Maybe>
        </div>
      </main>
    </PageContainer>
  );
}

export { ReferralsListPage };
