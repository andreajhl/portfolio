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
    <Link href={category.url} className={styles.CategoryCard}>
      <img
        className={styles.CategoryCardImage}
        src={category.image}
        alt={`Categoría "${category.title}"`}
      />
      <div className={styles.CategoryCardOverlay}>
        <span className={styles.CategoryCardTitle}>{category.title}</span>
      </div>
    </Link>
  );
}

export { CategoryCard };
