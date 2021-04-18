import CheckBoxList from "desktop-app/components/common/checkbox-list";
import { connect } from "react-redux";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from "react";
import { celebrityCategoriesOperations } from "react-app/src/state/ducks/celebrity-categories";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";

const mapStateToProps = ({ searchFilters, celebrityCategories }) => {
  return {
    celebrityCategories:
      celebrityCategories.fetchCelebrityCategoriesReducer.data.results,
    searchFilters
  };
};

const mapDispatchToProps = {
  listCelebrityCategories: celebrityCategoriesOperations.list,
  updateSearchFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CategoryFilterProps = StateProps & DispatchProps;

const generateNewMapForKeysValueOfArray = (array, value = true) => {
  const newState = new Map();
  array.forEach((id) => newState.set(id, value));
  return newState;
};

function CategoryFilter({
  celebrityCategories,
  listCelebrityCategories,
  updateSearchFilters,
  searchFilters
}: CategoryFilterProps) {
  useEffect(() => {
    const shouldFetchFilterOptions = !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCelebrityCategories({ orderBy: "title asc" });
  }, []);

  const [categoriesChecked, setCategoriesChecked] = useState(
    new Map(
      searchFilters.category_id
        ? generateNewMapForKeysValueOfArray(
            searchFilters.category_id.split(",")
          )
        : []
    )
  );

  const memoizedValueForCategoryFilters = useMemo(
    () =>
      celebrityCategories.map((category, index) => ({
        label: category.title,
        value: category.id,
        name: category.title + index,
        checked: categoriesChecked.get(String(category.id))
      })),
    [celebrityCategories, categoriesChecked]
  );

  useEffect(() => {
    // Si no existe el key category_id en redux store
    // realizar reset de todas las categorías checked
    if (!searchFilters.category_id)
      return setCategoriesChecked(new Map<string, boolean>());

    const categories_IDs = Array.from(categoriesChecked.keys()).join();
    // Si searchFilters realiza un update pero category_id posee los mismos valores
    // que el actual state no actualizar estado
    if (categories_IDs === searchFilters.category_id) return;
    const parse_IDs = searchFilters.category_id.split(",");
    setCategoriesChecked(generateNewMapForKeysValueOfArray(parse_IDs));
  }, [searchFilters]);

  useEffect(() => {
    let categories_IDs = Array.from(categoriesChecked).filter(
      ([_, isChecked]) => isChecked === true
    );
    const categoriesIDKeys = categories_IDs.map(([id]) => id).join();

    if (
      categories_IDs.length === 0 &&
      searchFilters?.category_id &&
      searchFilters?.category_id?.length !== 0
    ) {
      updateSearchFilters({
        category_id: categoriesIDKeys
      });
      return;
    }

    if (
      categoriesIDKeys !== searchFilters.category_id &&
      categories_IDs.length > 0
    ) {
      updateSearchFilters({
        category_id: categoriesIDKeys
      });
    }
  }, [categoriesChecked]);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<Map<string, boolean>>>
  ) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    setter(
      (prevState) =>
        new Map([...Array.from(prevState.entries()), [item, isChecked]])
    );
  };

  return (
    <CheckBoxList
      title="Categoria"
      options={memoizedValueForCategoryFilters}
      handleChange={(event) =>
        handleChangeCheckbox(event, setCategoriesChecked)
      }
    />
  );
}

const _CategoryFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilter);

export { _CategoryFilter as CategoryFilter };
