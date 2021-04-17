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

  const [categoriesChecked, setCategoriesChecked] = useState(new Map());

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
    // realizar reset de todos los countries checked
    if (!searchFilters.category_id)
      return setCategoriesChecked(new Map<string, boolean>());

    const categories_IDs = Array.from(categoriesChecked.keys()).join();
    console.log(categories_IDs);
    // Si searchFilters realiza un update pero category_id posee los mismos valores
    // que el actual state no actualizar estado
    if (categories_IDs === searchFilters.category_id) return;
    const parse_IDs = searchFilters.category_id.split(",");
    const newState = new Map();
    parse_IDs.forEach((id) => newState.set(id, true));
    setCategoriesChecked(newState);
  }, [searchFilters]);

  useEffect(() => {
    const categories_IDs = Array.from(categoriesChecked.keys()).join();
    if (
      categories_IDs !== searchFilters.category_id &&
      categories_IDs.length > 0
    ) {
      updateSearchFilters({
        category_id: categories_IDs
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
