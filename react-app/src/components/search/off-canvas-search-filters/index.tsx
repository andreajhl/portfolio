import { SearchFilters } from "desktop-app/components/search/search-filters";
import { PopupProps } from "reactjs-popup/dist/types";
import { AnimatedPopup } from "../../common/widgets/animated-popup";
import styles from "./styles.module.scss";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

type OffCanvasSearchFiltersProps = {
  trigger: PopupProps["trigger"];
};

function OffCanvasSearchFilters({ trigger }: OffCanvasSearchFiltersProps) {
  return (
    <AnimatedPopup
      lockScroll
      arrow={false}
      position="bottom right"
      trigger={trigger}
      overlayStyle={overlayStyle}
    >
      <div className={styles.OffCanvasSearchFilters}>
        <SearchFilters />
      </div>
    </AnimatedPopup>
  );
}

export { OffCanvasSearchFilters };
