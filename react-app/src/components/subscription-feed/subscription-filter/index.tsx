import React, { useState } from "react";
import CelebritiesSelect from "../../common/forms/celebrity-select";

const SubscriptionsFilter = ({ celebritiesSubscriptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <CelebritiesSelect
      celebrities={celebritiesSubscriptions.map(
        ({ celebrityId, celebrityAvatar, celebrityFullName }) => ({
          id: celebrityId,
          avatar: celebrityAvatar,
          fullName: celebrityFullName
        })
      )}
      defaultOption={{ value: "", label: "Mostrar todas mis suscripciones" }}
      selectedOption={selectedOption}
      onChange={(option) => setSelectedOption(option)}
    />
  );
};

export default SubscriptionsFilter;
