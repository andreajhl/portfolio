import ContractVideo from "desktop-app/components/common/cards/contract-video";
import React, { useEffect } from "react";
import { celebrityOperations } from "react-app/src/state/ducks/celebrities";
import { CardsReelSection, CardsReelSectionProps } from "../cards-section-reel";
import { connect } from "react-redux";

const publicContractsVideoReelProps = {
  itemWidth: 263,
  itemHeight: 350,
  buttonsStyle: {
    size: 49,
    top: 175,
    transform: "translateY(-50%)"
  },
  gap: 27,
  children: (celebrity) => <ContractVideo celebrity={celebrity} />
};

type CelebrityPublicContractsReelProps = {
  isLoading: boolean;
  publicContracts: [];
  listPublicContracts: (arg) => {};
  celebrityId: number;
  username: string;
  celebrityFullName: string;
  celebrityAvatar: string;
};
const CelebrityPublicContractsReel = ({
  isLoading,
  publicContracts,
  listPublicContracts,
  celebrityId,
  celebrityAvatar,
  celebrityFullName
}: CelebrityPublicContractsReelProps) => {
  useEffect(() => {
    listPublicContracts(celebrityId);
  }, [listPublicContracts]);
  return (
    <div>
      <h2>Últimos videos</h2>
      <CardsReelSection
        showHeader={false}
        itemCount={publicContracts.length}
        itemData={publicContracts}
        itemWidth={publicContractsVideoReelProps.itemWidth}
        itemHeight={publicContractsVideoReelProps.itemHeight}
        buttonsStyle={publicContractsVideoReelProps.buttonsStyle}
      >
        {(publicContract) => (
          <ContractVideo
            celebrity={{
              videoUrl: publicContract.contract_media,
              videoPosterUrl: publicContract.video_poster_url
            }}
          />
        )}
        {/* {publicContractsVideoReelProps.children} */}
      </CardsReelSection>
    </div>
  );
};
// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.fetchPublicContractsReducer.loading,
  publicContracts: state.celebrities.fetchPublicContractsReducer.data.results
});

// mapStateToProps
const mapDispatchToProps = {
  listPublicContracts: celebrityOperations.listPublicContracts
};

// Export Class
const _CelebrityPublicContractsReel = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityPublicContractsReel);
export { _CelebrityPublicContractsReel as CelebrityPublicContractsReel };
