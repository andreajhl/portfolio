import { getSearchPath } from "constants/paths";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  linkTitle: {
    defaultMessage: `Ir a "{categoryTitle}"`,
  },
});

type CategoryType = {
  id: number;
  title: string;
  image: string;
};

type CategoryCardProps = {
  category: CategoryType;
};

function CategoryCard({ category }: CategoryCardProps) {
  const { formatMessage } = useIntl();
  const linkTitle = formatMessage(messages.linkTitle, {
    categoryTitle: category.title,
  });
  return (
    <Link
      href={getSearchPath({ category_id: category.id })}
      className={styles.CategoryCard}
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0, 0.85) 10.94%, rgba(255, 255, 255, 0) 100%),
          url("/assets/img/categories/${category.title}.jpg")`,
        backgroundBlendMode: "multiply",
      }}
      title={linkTitle}
    >
      <span className={styles.CategoryCardTitle}>{category.title}</span>
    </Link>
  );
}

export { CategoryCard };
