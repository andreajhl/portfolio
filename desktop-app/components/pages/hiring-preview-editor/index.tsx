import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import ViewerClientVideo from "desktop-app/components/common/cards/viewer-client-video";
import VideoActionButtons from "desktop-app/components/common/cards/video/action-buttons";

const mockData = {
  id: 2530,
  fullName: "Nacho",
  username: "nacho",
  avatar:
    "https://dqb0851cl2gjs.cloudfront.net/celebrities/2530/avatar/famosos-videos-personalizados-nacho-compressed.jpeg",
  mainVideo:
    "https://dqb0851cl2gjs.cloudfront.net/main-videos/2530/famosos-videos-personalizados-nacho-crf-video480.mp4",
  hashtags: ["chinoynacho", "venezuela", "nacho", "latingrammy", "lacriatura"],
  title: "Músicos",
  categoryId: 5,
  videoMessagePrice: 125,
  countryCode: "VEN",
  countryId: 31,
  countryName: "Venezuela",
  showSimilarCelebrities: true,
  availableForFlashDeliveries: false,
  availableForSubscriptions: false,
  videoPosterUrl:
    "https://d3dxo4xx2lwk55.cloudfront.net/videos/609/14805/famosos-videos-personalizados-enriquearce-202102181551-7872249-14805-crf-video-poster480.jpg",
  videoUrl:
    "https://dqb0851cl2gjs.cloudfront.net/main-videos/367/famosos-videos-personalizados-vanessaguzman-crf-video-watermark480.mp4",
  occasion: "",
  alpha2Code: "CO",
  categoryTitle: "Actores",
  turnaround: 0,
  description: "asd",
  causeName: "None",
  isDonor: false,
};

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

const HiringPreviewEditorPage = ({
  contractReference,
}: HiringPreviewEditorPageProps) => {
  return (
    <PageContainer showFooter={false}>
      <main className={styles.HiringPreviewEditorPage}>
        <div className={classes("container", styles.Container)}>
          <div className={styles.LeftSide}>
            <EditorForm />
          </div>
          <div className={styles.RightSide}>
            <ViewerClientVideo
              avatar={mockData.avatar}
              fullName={mockData.fullName}
              username={mockData.username}
              videoUrl={mockData.videoUrl}
              videoPosterUrl={mockData.videoPosterUrl}
              previewMode
            ></ViewerClientVideo>
            <div style={{ padding: 10 }}>
              <VideoActionButtons
                videoURL={mockData.videoUrl}
              ></VideoActionButtons>
            </div>
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export { HiringPreviewEditorPage };
