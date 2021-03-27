import { getSearchPath } from "constants/paths";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";

type CategoryType = {
  id: number;
  title: string;
  image: string;
};

type CategoryCardProps = {
  category: CategoryType;
};

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={getSearchPath({ category_id: category.id })}
      className={styles.CategoryCard}
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0, 0.85) 10.94%, rgba(255, 255, 255, 0) 100%),
          url("/assets/img/categories/${category.title}.jpg")`,
        backgroundBlendMode: "multiply"
      }}
      title={`Ir a categoría "${category.title}"`}
    >
      <span className={styles.CategoryCardTitle}>{category.title}</span>
    </Link>
  );
}

export { CategoryCard };
