import { getSearchPath } from "constants/paths";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";
import { defineMessages } from "react-intl";
import useValidatedFormattedMessage from "lib/hooks/useValidatedFormattedMessage";
import { analytics } from "react-app/src/state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";

const messages = defineMessages({
  linkTitle: {
    defaultMessage: `Ir a "{categoryTitle}"`,
  },
});

type CategoryType = {
  id: number;
  title: string;
  codename: string;
};

type CategoryCardProps = {
  category: CategoryType;
};

function CategoryCard({ category }: CategoryCardProps) {
  const getValidMessage = useValidatedFormattedMessage();
  const categoryTitle = getValidMessage(category.title);
  const linkTitle = getValidMessage(messages.linkTitle, {
    categoryTitle,
  });
  const imgFileName = category.codename?.toLowerCase?.();

  function trackClickEvent() {
    analytics.track("CLICK_ON_CATEGORY_CARD", {
      category,
      categoryTitle,
      path: getWindow().location.pathname,
      widget: "CategoryCard",
    });
  }

  return (
    <Link
      href={getSearchPath({ category_id: category.id })}
      className={styles.CategoryCard}
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0, 0.85) 10.94%, rgba(255, 255, 255, 0) 100%),
          url("/assets/img/categories/${imgFileName}.jpg")`,
        backgroundBlendMode: "multiply",
      }}
      title={linkTitle}
      onClick={trackClickEvent}
    >
      <span className={styles.CategoryCardTitle}>{categoryTitle}</span>
    </Link>
  );
}

export { CategoryCard };
