import CheckBoxList from "desktop-app/components/common/checkbox-list";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect } from "react-redux";

const deliveryTimeFilter = [
  { label: "Flash (24hrs)", value: "flash" },
  { label: "Menos de 3 días", value: 3 },
  { label: "Menos de 5 días", value: 5 },
  { label: "Hasta 7 días", value: 7 },
];

const mapStateToProps = ({ searchFilters }) => ({
  searchFilters,
});

const mapDispatchToProps = {
  updateSearchFilters,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CategoryFilterProps = StateProps & DispatchProps;

function DeliveryTimeFilter({
  updateSearchFilters,
  searchFilters,
}: CategoryFilterProps) {
  const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState(
    new Map(
      searchFilters.max_delivery_time
        ? [[String(searchFilters.max_delivery_time), true]]
        : []
    )
  );

  useEffect(() => {
    // Si no existe el key max_delivery_time en redux store
    // realizar reset de todos los countries checked
    if (!searchFilters.max_delivery_time)
      return setDeliveriesTimeChecked(new Map());
    const deliveryTime = Array.from(deliveriesTimeChecked).filter(
      ([_, isChecked]) => isChecked === true
    );
    const deliveryTimeValue = deliveryTime.map(([id]) => id).join();

    // Si searchFilters realiza un update pero country_id posee los mismos valores
    // que el actual state no actualizar estado

    if (Number(deliveryTimeValue) === searchFilters.max_delivery_time) return;
    const newState = new Map([[String(searchFilters.max_delivery_time), true]]);
    setDeliveriesTimeChecked(newState);
  }, [searchFilters]);

  useEffect(() => {
    const deliveryTime = Array.from(deliveriesTimeChecked).filter(
      ([_, isChecked]) => isChecked === true
    );

    const deliveryTimeValue = deliveryTime.map(([id]) => id).join();

    if (
      deliveryTime.length === 0 &&
      searchFilters?.max_delivery_time &&
      searchFilters?.max_delivery_time !== 0
    ) {
      updateSearchFilters({
        max_delivery_time: Number(deliveryTimeValue),
      });
      return;
    }

    if (
      Number(deliveryTimeValue) !== Number(searchFilters.max_delivery_time) &&
      deliveryTime.length > 0
    ) {
      updateSearchFilters({
        max_delivery_time: Number(deliveryTimeValue),
      });
    }
  }, [deliveriesTimeChecked]);

  const memoizedValuesForDeliveryTimeFilter = useMemo(
    () =>
      deliveryTimeFilter.map((time, index) => ({
        label: time.label,
        value: time.value,
        name: time.label + index,
        checked: deliveriesTimeChecked.get(String(time.value)),
      })),
    [deliveriesTimeChecked]
  );

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<Map<string, boolean>>>
  ) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    setter(() => new Map([[item, isChecked]]));
  };
  return (
    <CheckBoxList
      title="Tiempo de entrega"
      options={memoizedValuesForDeliveryTimeFilter}
      handleChange={(event) =>
        handleChangeCheckbox(event, setDeliveriesTimeChecked)
      }
    />
  );
}

const _DeliveryTimeFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryTimeFilter);

export { _DeliveryTimeFilter as DeliveryTimeFilter };
