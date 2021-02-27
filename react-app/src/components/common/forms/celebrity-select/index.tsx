import { celebrityType } from "react-app/src/types/celebrityType";
import Select from "react-select";
import { ProfilePicture } from "../../../layouts/profile-picture";
import { OptionDiv, OptionText, styles } from "./styles";

type CelebrityOptionLabelProps = {
  celebrity: celebrityType;
};

const CelebrityOptionLabel = ({
  celebrity: { avatar, fullName }
}: CelebrityOptionLabelProps) => (
  <OptionDiv>
    <ProfilePicture avatar={avatar} width="44px" />
    <OptionText>{fullName}</OptionText>
  </OptionDiv>
);

// export type CelebritiesSelectProps = {
//   onChange?: () => void;
//   selectedOption;
//   defaultOption;
//   celebrities;
// };

const CelebritiesSelect = ({
  onChange = (option) => {},
  selectedOption,
  defaultOption,
  celebrities = []
}) => {
  const options = [
    defaultOption,
    ...celebrities.map((celebrity) => ({
      value: celebrity.id,
      label: <CelebrityOptionLabel celebrity={celebrity} />
    }))
  ];

  return (
    <Select
      isClearable={false}
      isSearchable={false}
      isMulti={false}
      options={options}
      defaultValue={defaultOption}
      selectOption={selectedOption}
      onChange={onChange}
      styles={styles}
    />
  );
};

export default CelebritiesSelect;
