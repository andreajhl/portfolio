import { getSearchCategoryPath, getSearchPath } from "constants/paths";
import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import { Link } from "desktop-app/components/common/routing/link";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { celebrityType } from "desktop-app/types/celebrityType";

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
};

function CelebrityProfilePage({ celebrity }: CelebrityProfilePageProps) {
  return (
    <PageContainer>
      <PageHeading showHomeLink>
        <Link
          href={getSearchCategoryPath(celebrity.categoryId)}
          className="font-weight-bold"
          style={{
            color: "var(--dark)"
          }}
        >
          {celebrity.categoryTitle}
        </Link>
      </PageHeading>
      <div className="container" style={{ height: "724px" }}>
        <div style={{ width: "616px" }}>
          <CelebrityDetails celebrity={celebrity} />
        </div>
      </div>
    </PageContainer>
  );
}

export { CelebrityProfilePage };
