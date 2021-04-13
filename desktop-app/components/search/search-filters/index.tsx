import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { useState } from "react";
import { RangeSlider } from "desktop-app/components/range-slider";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

function SearchFilters({ ...props }: SearchFiltersProps) {
  const [values, setValues] = useState<[number, number]>([0, 500]);
  const [min, max] = values;
  return (
    <div className={styles.SearchFilters}>
      <label>Precio</label>
      <br />
      Min: {min} <br />
      max: {max} <br />
      <RangeSlider
        min={1}
        max={500}
        values={values}
        onValuesUpdated={({ values }) => {
          setValues(values);
        }}
      />
    </div>
  );
}

const _SearchFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilters);

export { _SearchFilters as SearchFilters };
