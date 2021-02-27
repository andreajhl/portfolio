import styled from "styled-components";

export const OptionDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
export const OptionText = styled.span`
  margin-left: 22px;
  font-size: 14px;
`;
const SelectHeight = "63px";

export const styles = {
  indicatorSeparator: () => ({ display: "none" }),
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
