import React, { useState } from "react";
import { CountryFilterNavBar } from "desktop-app/components/search/country-filter-navBar";
import { FilterRatingNavbar } from "desktop-app/components/search/filter-rating";
import { PriceRangeNavBar } from "desktop-app/components/search/filter-price-range-navbar";
import { ExtraProductFilterNavBar } from "desktop-app/components/search/filter-extra-products";
import { DeliveryTimeFilterNavbar } from "desktop-app/components/search/delivery-time-filter-navBar";
import styles from "./styles.module.scss";

function FiltersElementsReel() {
  const [activeFilter, setActiveFilter] = useState<
    "country" | "rating" | "price" | "addons" | "delivery_time" | null
  >(null);
  const handleToggleFilter = (
    filter: "country" | "rating" | "price" | "addons" | "delivery_time"
  ) => {
    // if the filter is already active, then deactivate it
    if (activeFilter === filter) {
      setActiveFilter(null);
    }
    // if the filter is not active, then activate it
    else {
      setActiveFilter(filter);
    }
  };
  return (
    <div className={styles.HorizontalReel}>
      <CountryFilterNavBar
        isOpen={activeFilter === "country"}
        onToggle={() => handleToggleFilter("country")}
      />
      <DeliveryTimeFilterNavbar
        isOpen={activeFilter === "delivery_time"}
        toOpen={() => handleToggleFilter("delivery_time")}
      />
      <PriceRangeNavBar
        isOpen={activeFilter === "price"}
        toOpen={() => handleToggleFilter("price")}
      />
      <FilterRatingNavbar
        isOpen={activeFilter === "rating"}
        toOpen={() => handleToggleFilter("rating")}
      />
      {/* <ExtraProductFilterNavBar isOpen={false} toOpen={() => handleToggleFilter("country")} /> */}
    </div>
  );
}

export { FiltersElementsReel };
