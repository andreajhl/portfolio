import {CategorieFilterCarrousel } from 'desktop-app/components/search/categories-filter-carrousel';
import { NewFiltersSectionLayout } from "react-app/src/components/layouts/new-filters-section";
import styles from './styles.module.scss';

export const NewFilterBar = () => {
  return (
    <div className={styles.filter}>
      <div className={styles.filter_Div}>
        <div className={styles.filter_carrousel}>
          <CategorieFilterCarrousel
            itemWidth={108}
            itemHeight={61}
            gap={20}
          />  
        </div>
        <div className={styles.filter_option}>
          <NewFiltersSectionLayout/> 
        </div>
      </div>
    </div>
  );
};
