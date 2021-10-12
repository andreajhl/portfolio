import { CategorieFilterCarrousel } from "desktop-app/components/search/categories-filter-carrousel";
import styles from "./styles.module.scss";
import { FiltersElementsReel } from "../filters-elements-reel/index";
function NewSearchBarSection() {
  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchBarContainer_div}>
        <CategorieFilterCarrousel itemWidth={270} itemHeight={150} gap={20} />
        <FiltersElementsReel />
      </div>
    </div>
  );
}

export default NewSearchBarSection;
