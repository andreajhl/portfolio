import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import { useState } from "react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import InfiniteScroll from "react-infinite-scroll-component";
import CelebrityContractCardReel from "../contract-card-reel";
import CelebrityContractVideoReel from "../contract-video-reel";

const celebritiesSectionMockData = [
  {
    reelTitle: "Tus Favoritos",
    type: "contractCard"
  },
  {
    reelTitle: "Famosos Destacados",
    type: "contractCard"
  },
  {
    reelTitle: "Videos trending",
    type: "contractVideo"
  },
  {
    reelTitle: "Famosos recientes",
    type: "contractCard"
  },
  {
    reelTitle: "Los mas populares",
    type: "contractCard"
  },
  {
    reelTitle: "Cumpleaños",
    type: "contractCard"
  },
  {
    reelTitle: "Actores",
    type: "contractCard"
  },
  {
    reelTitle: "Personajes",
    type: "contractCard"
  },
  {
    reelTitle: "Para alegrar el dia",
    type: "contractCard"
  },
  {
    reelTitle: "Musicos",
    type: "contractCard"
  },
  {
    reelTitle: "Serenatas",
    type: "contractCard"
  }
];

const CelebritiesSection = () => {
  const [mockDataLoaded, setMockDataLoaded] = useState(
    celebritiesSectionMockData.slice(0, 5)
  );
  const fetchMoreData = () => {
    setMockDataLoaded((prevState) =>
      celebritiesSectionMockData.slice(0, prevState.length + 5)
    );
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={mockDataLoaded.length}
        next={fetchMoreData}
        hasMore={mockDataLoaded.length < celebritiesSectionMockData.length}
        loader={<LoaderLayout />}
        endMessage="Eso es todo amigos!"
      >
        <div className="mb-5">
          {mockDataLoaded.map((data) =>
            data.type === "contractCard" ? (
              <CelebrityContractCardReel reelTitle={data.reelTitle} />
            ) : (
              <CelebrityContractVideoReel reelTitle={data.reelTitle} />
            )
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CelebritiesSection;
