import dynamic from "next/dynamic";
import React, { useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

type SelectCardBankPaymentMethodProps = {
  options: Array<{
    value: number;
    label: string;
  }>;
  onChangeOptionSelected: Function;
};

const SelectCardBankPaymentMethod = ({
  options,
  onChangeOptionSelected,
}: SelectCardBankPaymentMethodProps) => {
  const [optionSelected, setOptionSelected] = useState(null);
  const handleChange = (selectedOption) => {
    setOptionSelected(selectedOption);
    onChangeOptionSelected(selectedOption);
  };
  return (
    <Select
      value={optionSelected}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
    />
  );
};

export default SelectCardBankPaymentMethod;
