import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { ProfilePicture } from "../../layouts/profile-picture";

const IndicatorSeparator = () => null;

const selectComponents = { IndicatorSeparator };

const OptionDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const OptionText = styled.span`
  margin-left: 22px;
  font-size: 14px;
`;

const CelebrityOptionLabel = () => (
  <OptionDiv>
    <ProfilePicture
      avatar="https://via.placeholder.com/600/e0c586"
      width="44px"
    />
    <OptionText>Andrés Cepeda</OptionText>
  </OptionDiv>
);

const options = [
  { value: "", label: "Mostrar todas mis suscripciones" },
  {
    value: "chocolate",
    label: <CelebrityOptionLabel />
  }
];

const SelectHeight = "63px";

const styles = {
  control: (styles) => ({
    ...styles,
    height: SelectHeight,
    borderRadius: "5px",
    borderColor: "#C4C4C4 !important",
    boxShadow: "none",
    zIndex: "7"
  }),
  valueContainer: (styles) => ({ ...styles }),
  option: (styles, { isFocused }) => {
    return {
      ...styles,
      fontSize: "14px",
      paddingLeft: "22px",
      height: SelectHeight,
      backgroundColor: isFocused ? "#ffe1f0" : null,
      color: null,
      display: "flex",
      alignItems: "center"
    };
  },
  menu: (styles) => ({
    ...styles,
    margin: 0,
    overflow: "hidden",
    borderRadius: "0px 0px 10px 10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)"
  }),
  menuList: (styles) => ({ ...styles, padding: 0 })
};

const SubscriptionsFilter = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Select
      components={selectComponents}
      isClearable={false}
      isSearchable={false}
      isMulti={false}
      options={options}
      defaultValue={options[0]}
      selectOption={selectedOption}
      onChange={(option) => setSelectedOption(option)}
      styles={styles}
    />
  );
};

export default SubscriptionsFilter;
