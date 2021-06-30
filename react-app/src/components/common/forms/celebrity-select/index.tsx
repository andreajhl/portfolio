import dynamic from "next/dynamic";
import { celebrityType } from "react-app/src/types/celebrityType";
import { ProfilePicture } from "../../../layouts/profile-picture";
import { OptionDiv, OptionText, styles } from "./styles";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div style={{ height: "63px" }} />
});

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

  // return (
  //   <Select
  //     isClearable={false}
  //     isSearchable={false}
  //     isMulti={false}
  //     options={options}
  //     defaultValue={defaultOption}
  //     onChange={onChange}
  //     styles={styles}
  //   />
  // );
  return (
    <div>
      {/*//TODO: CelebrityOptionLabelProps*/}
    </div>
  )
};

export default CelebritiesSelect;
