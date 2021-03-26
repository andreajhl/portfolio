import ContractVideo from "desktop-app/components/common/cards/contract-video";
import React, { useEffect } from "react";
import { celebrityOperations } from "react-app/src/state/ducks/celebrities";
import { CardsReelSection, CardsReelSectionProps } from "../cards-section-reel";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
const mockData = [
  {
    contract_id: 9951,
    contract_reference: "202102231457-1532892-9951",
    contract_delivery_to: "Juanito",
    user_full_name: "Isaac Peña",
    contract_media:
      "https://famosos-output-videos-testing.s3.amazonaws.com/videos/609/9951/famosos-videos-personalizados-enriquearce-202102231457-1532892-9951-crf-video-watermark480.mp4",
    video_poster_url:
      "https://famosos-output-videos-testing.s3.amazonaws.com/videos/609/9951/famosos-videos-personalizados-enriquearce-202102231457-1532892-9951-crf-video-poster480.jpg"
  }
  // {
  //   contract_id: 9950,
  //   contract_reference: "202102231451-1855905-9950",
  //   contract_delivery_to: "Juanito",
  //   user_full_name: "Isaac Peña",
  //   contract_media:
  //     "https://famosos-output-videos-testing.s3.amazonaws.com/videos/609/9950/famosos-videos-personalizados-enriquearce-202102231451-1855905-9950-crf-video-watermark480.mp4",
  //   video_poster_url:
  //     "https://famosos-output-videos-testing.s3.amazonaws.com/videos/609/9950/famosos-videos-personalizados-enriquearce-202102231451-1855905-9950-crf-video-poster480.jpg"
  // }
];

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
      <CardsReelSection
        className={
          publicContracts.length < 4 ? styles.ReelContainerFitContent : ""
        }
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
