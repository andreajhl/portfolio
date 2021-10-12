import { FilterSectionModal } from "react-app/src/components/containers/filter-section-modal";
import * as GTM from "react-app/src/state/utils/gtm.js";
import getWindow from "react-app/src/utils/getWindow.js";
import { useIntl, defineMessage } from "react-intl";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import { styles } from "../../common/forms/celebrity-select/styles";

const messageForLabelButtonCategoryPrice = defineMessage({
  description: "buttonLabel search by Price",
  defaultMessage: "Calificaciones",
});

type filterCountriesProps = {
  setFilterByRatings: (paramName: number) => void;
};

export const FilterSectionRatings = ({
  setFilterByRatings,
}: filterCountriesProps) => {
  const intl = useIntl();

  const [starChecked, setStarChecked] = useState(4);

  const onChangeRating = (value) => {
    setStarChecked(value);
  };
  const analyticsData = {
    widget: "CelebritiesFilter",
    path: getWindow().location.pathname,
    star: starChecked,
  };

  const onModalOpen = () => {
    GTM.tagManagerDataLayer("OPEN_CELEBRITIES_FILTER_MODAL", analyticsData);
  };
  const onModalClose = () => {
    GTM.tagManagerDataLayer("CLOSE_CELEBRITIES_FILTER_MODAL", analyticsData);
  };

  const applyFilters = () => {
    GTM.tagManagerDataLayer("APPLY_CELEBRITIES_FILTER", analyticsData);
    setFilterByRatings(starChecked);
  };

  return (
    <FilterSectionModal
      buttonLabel={intl.formatMessage(messageForLabelButtonCategoryPrice)}
      modalTitle={intl.formatMessage(messageForLabelButtonCategoryPrice)}
      footerButtonLabel={<FormattedMessage defaultMessage="Aplicar filtro" />}
      footerButtonOnClick={applyFilters}
      onModalOpen={onModalOpen}
      onModalClose={onModalClose}
    >
      <div className={styles.modalStar}>
        <StarRatingDisplay
          value={starChecked}
          editing
          onChangeRating={onChangeRating}
          starSchemeColor={"pink"}
        />
      </div>
    </FilterSectionModal>
  );
};
