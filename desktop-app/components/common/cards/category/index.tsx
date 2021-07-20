import { getSearchPath } from "constants/paths";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";
import { defineMessages } from "react-intl";
import useValidatedFormattedMessage from "lib/hooks/useValidatedFormattedMessage";

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
    >
      <span className={styles.CategoryCardTitle}>{categoryTitle}</span>
    </Link>
  );
}

export { CategoryCard };
