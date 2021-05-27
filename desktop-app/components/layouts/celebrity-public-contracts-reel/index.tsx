import ContractVideo from "desktop-app/components/common/cards/contract-video";
import React, { useEffect } from "react";
import { celebrityOperations } from "react-app/src/state/ducks/celebrities";
import { CardsReelSection } from "../cards-section-reel";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";

const mapStateToProps = (state) => ({
  isLoading: state.celebrities.fetchPublicContractsReducer.loading,
  publicContracts: state.celebrities.fetchPublicContractsReducer.data.results,
});

const mapDispatchToProps = {
  listPublicContracts: celebrityOperations.listPublicContracts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebrityPublicContractsReelProps = {
  celebrityId: number;
  username: string;
  celebrityFullName: string;
  celebrityAvatar: string;
} & StateProps &
  DispatchProps;

const buttonsStyle = {
  size: 49,
  top: 175,
  transform: "translateY(-50%)",
};

const renderContractVideo = (contract) => (
  <ContractVideo
    occasion={contract?.occasion}
    videoUrl={contract.contract_media}
    videoPosterUrl={contract.video_poster_url}
  />
);

const CelebrityPublicContractsReel = ({
  isLoading,
  publicContracts,
  listPublicContracts,
  celebrityId,
}: CelebrityPublicContractsReelProps) => {
  useEffect(() => {
    listPublicContracts(celebrityId);
  }, [celebrityId, listPublicContracts]);
  return (
    <Maybe it={publicContracts?.length > 0}>
      <div>
        <CardsReelSection
          title="Últimos videos"
          className={
            publicContracts?.length < 3 ? styles.ReelContainerFitContent : ""
          }
          itemCount={publicContracts?.length}
          itemData={publicContracts}
          itemWidth={263}
          itemHeight={350}
          buttonsStyle={buttonsStyle}
          gap={27}
        >
          {renderContractVideo}
        </CardsReelSection>
      </div>
    </Maybe>
  );
};

// Export Class
const _CelebrityPublicContractsReel = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityPublicContractsReel);
export { _CelebrityPublicContractsReel as CelebrityPublicContractsReel };
