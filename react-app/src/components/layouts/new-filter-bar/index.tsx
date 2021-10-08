import {CategorieFilterCarrousel } from 'desktop-app/components/search/categories-filter-carrousel';
import { NewFiltersSectionLayout } from "react-app/src/components/layouts/new-filters-section";
import styles from './styles.module.scss'

export const NewFilterBar = () => {
  return (
    <div className={styles.container_filter}>
      <div className={styles.container_filter_div}>
        <CategorieFilterCarrousel
          itemWidth={108}
          itemHeight={61}
          gap={20}
        />
        <NewFiltersSectionLayout/>        
      </div>
    </div>
  );
};
