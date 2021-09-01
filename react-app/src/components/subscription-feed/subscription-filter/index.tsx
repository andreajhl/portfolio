import React from "react";
import { FormattedMessage } from "react-intl";
import CelebritiesSelect from "../../common/forms/celebrity-select";

const defaultOption = {
  value: null,
  label: <FormattedMessage defaultMessage="Mostrar todas mis suscripciones" />,
};

function SubscriptionsFilter({
  currentChoice,
  celebritiesSubscriptions,
  onChangeCelebrity,
}) {
  return (
    <CelebritiesSelect
      value={currentChoice}
      celebrities={celebritiesSubscriptions.map(
        ({ celebrityId, celebrityAvatar, celebrityFullName }) => ({
          id: celebrityId,
          avatar: celebrityAvatar,
          fullName: celebrityFullName,
        })
      )}
      defaultOption={defaultOption}
      onChange={(option) => {
        onChangeCelebrity(option.value);
      }}
    />
  );
}

export default SubscriptionsFilter;
