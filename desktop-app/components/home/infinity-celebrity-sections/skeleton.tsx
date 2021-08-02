import { CelebrityCardSkeleton } from "desktop-app/components/common/cards/celebrity/skeleton";
import { CardContractVideoSkeleton } from "desktop-app/components/common/cards/contract-video/skeleton";
import React from "react";

function SectionVideoSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "30px",
        overflow: "hidden",
      }}
    >
      <div>
        <CardContractVideoSkeleton />
      </div>
      <div
        style={{
          marginLeft: "26px",
        }}
      >
        <CardContractVideoSkeleton />
      </div>
      <div
        style={{
          marginLeft: "26px",
        }}
      >
        <CardContractVideoSkeleton />
      </div>
      <div
        style={{
          marginLeft: "26px",
        }}
      >
        <CardContractVideoSkeleton />
      </div>
    </div>
  );
}
function SectionCardsCelebritySkeleton() {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "30px",
        overflow: "hidden",
      }}
    >
      <div>
        <CelebrityCardSkeleton />
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{
            marginLeft: "18px",
          }}
        >
          <CelebrityCardSkeleton />
        </div>
      ))}
    </div>
  );
}

function InfinityCelebritySkeleton() {
  return (
    <>
      <SectionVideoSkeleton />
      <SectionCardsCelebritySkeleton />
    </>
  );
}

export { InfinityCelebritySkeleton };
