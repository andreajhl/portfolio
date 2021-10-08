<<<<<<< Updated upstream
import { FiltersSectionLayout } from "../filters-section";
import {CategorieFilterCarrousel } from 'desktop-app/components/search/categories-filter-carrousel';
=======
import {CategorieFilterCarrousel } from 'desktop-app/components/search/categories-filter-carrousel';
import { FiltersSectionLayout } from "../filters-section";
>>>>>>> Stashed changes

export const NewFilterBar = () => {
    return (
        <div>
            <CategorieFilterCarrousel
                itemWidth={108}
                itemHeight={61}
                gap={20}
            />
            <FiltersSectionLayout/>
        </div>
<<<<<<< Updated upstream
    )
}
=======
    );
};
>>>>>>> Stashed changes
