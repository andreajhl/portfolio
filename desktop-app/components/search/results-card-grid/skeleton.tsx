import { CelebrityCardSkeleton } from "desktop-app/components/common/cards/celebrity/skeleton";
import getArrayOfLength from "lib/utils/getArrayOfLength";

type ResultsCardGridSkeletonProps = {
  thumbnailWidth?: number | string;
  thumbnailHeight?: number | string;
};

function ResultsCardGridSkeleton({
  thumbnailHeight,
  thumbnailWidth,
}: ResultsCardGridSkeletonProps) {
  return (
    <>
      {getArrayOfLength(40).map((_, index) => (
        <CelebrityCardSkeleton
          key={index}
          thumbnailHeight={thumbnailHeight}
          thumbnailWidth={thumbnailWidth}
        />
      ))}
    </>
  );
}

export { ResultsCardGridSkeleton };
