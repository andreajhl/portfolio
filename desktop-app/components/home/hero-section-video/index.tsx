type HeroSectionVideoProps = {
  userLocation: string;
};

const countriesWithVideo = ["CO", "AR", "MX"];

function HeroSectionVideo({ userLocation }: HeroSectionVideoProps) {
  return (
    <video
      src={`https://famosos-media.s3.amazonaws.com/famosos-com-assets/home/banner-video${
        countriesWithVideo.includes(userLocation)
          ? `-${userLocation?.toLowerCase?.()}`
          : ""
      }.mp4`}
      muted
      autoPlay
      loop
      preload="metadata"
    />
  );
}

export { HeroSectionVideo };
