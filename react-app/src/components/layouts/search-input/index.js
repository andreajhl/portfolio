import React, { useState } from "react";

const SearchInputLayout = ({
  autoFocus,
  searchLabel,
  onSearchChange,
  initialValue
}) => {
  const [keyword, setKeyword] = useState(initialValue);

  const changeKeyword = ({ target }) => {
    const inputValue = target.value;
    setKeyword(inputValue);
    onSearchChange(inputValue);
  };

  return (
    <div className="SearchInputLayout">
      <div className="form-group">
        <div className="input-group">
          <i className="fa fa-search" />
          <input
            autoFocus={autoFocus}
            id="input-search"
            className="form-control"
            type="text"
            name="search"
            value={keyword}
            onChange={changeKeyword}
            placeholder={searchLabel}
          />
        </div>
      </div>
    </div>
  );
};

SearchInputLayout.defaultProps = {
  searchLabel: "Buscar",
  onSearchChange: () => {},
  autoFocus: false,
  initialValue: ""
};

// Export Class
export { SearchInputLayout };
