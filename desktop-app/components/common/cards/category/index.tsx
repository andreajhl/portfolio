import { Link } from "../../routing/link";
import styles from "./styles.module.scss";

type CategoryType = {
  title: string;
  image: string;
  url: string;
};

type CategoryCardProps = {
  category: CategoryType;
};

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.url}
      className={styles.CategoryCard}
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          #000000 10.94%,
          rgba(255, 255, 255, 0) 100%
        ),
        url("${category.image}")`
      }}
      title={`Ir a categoría "${category.title}"`}
    >
      <span className={styles.CategoryCardTitle}>{category.title}</span>
    </Link>
  );
}

export { CategoryCard };
