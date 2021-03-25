import { getSearchCategoryPath, getSearchPath } from "constants/paths";
import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import { Link } from "desktop-app/components/common/routing/link";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import LastReviewsSection from "desktop-app/components/layouts/last-reviews-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { celebrityType } from "desktop-app/types/celebrityType";

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
};

const mockData = [
  {
    contract_id: 9260,
    contract_review:
      "Oleeee, hermoso. Muchas gracias Enrique, que rápido wow. Éxitos, que Dios te Bendiga.",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 7310,
    contract_review: "Gracias ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 6955,
    contract_review: "Excelente muchísimas gracias, un abrazo!!",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 5407,
    contract_review:
      " ¡Gracias Enrique! Esta fantástico no se lo va a creer. Significa mucho. Algo tan pequeño para ti puede tener un impacto enorme en otro persona.  ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 4583,
    contract_review: "Gracias amigooo hermoso regaloo",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 4503,
    contract_review:
      "Excelente mi hermanito  espectacularrr espectacular esssssspectacular.   Fuerte abrazo ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  }
];

function CelebrityProfilePage({
  celebrity,
  ...props
}: CelebrityProfilePageProps) {
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
      <div className="container">
        <div style={{ width: "616px" }}>
          <CelebrityDetails celebrity={celebrity} />
        </div>
        <CelebrityPublicContractsReel
          celebrityId={celebrity.id}
          username={celebrity.username}
          celebrityFullName={celebrity.fullName}
          celebrityAvatar={celebrity.avatar}
        />
        <LastReviewsSection
          reviews={mockData}
          showMore={true}
        ></LastReviewsSection>
      </div>
    </PageContainer>
  );
}

export { CelebrityProfilePage };
