import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { listV2 } from "react-app/src/state/ducks/countries/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import Reel from "desktop-app/components/layouts/reel";
import { getSearchCountryPath } from "constants/paths";
import { useRouter } from "next/router";
import { Link } from "desktop-app/components/common/routing/link";

const generateKeysValue = (array) => {
  let arrayCountries = array.map((e) => ({ label: e.name, value: e.id }));
  return arrayCountries;
};

type timeFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const countries = ({ countries }: RootState) => countries.countriesReducer;

const buttonStyle = {
  size: 25,
  top: 15,
  opacity: 0.6,
  transform: "translateY(-50%)",
};

function CountryFilterNavBar({ isOpen, onToggle }: timeFilterProps) {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { completed, data, error_data, failed, loading } = useSelector(
    countries
  );
  const arrayCountries = generateKeysValue(data.results);

  useEffect(() => {
    dispatch(listV2({ orderBy: "name asc" }));
  }, [dispatch]);

  return (
    <div className={styles.option}>
      <span onClick={() => onToggle()} className={styles.optionTittle}>
        <FormattedMessage defaultMessage="Paises" />
      </span>
      {isOpen && !loading && (
        <div className={styles.ContainerOption}>
          <Reel
            itemSize={180}
            height={35}
            scrollByOffset={10}
            itemCount={arrayCountries.length}
            // width={listWidth}
            buttonsStyle={buttonStyle}
            itemData={arrayCountries}
          >
            {({ data, index, style }) => {
              const hashtag = data[index].label;
              const value = data[index].value;
              return (
                <Link href={getSearchCountryPath(value)}>
                  <div
                    style={{ ...style, left: Number(style.left) + 10 * index }}
                  >
                    <span className={styles.BadgeStyle}>{hashtag}</span>
                  </div>
                </Link>
              );
            }}
          </Reel>
        </div>
      )}
    </div>
  );
}

export { CountryFilterNavBar };
