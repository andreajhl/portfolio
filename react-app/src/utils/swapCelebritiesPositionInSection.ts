type swapCelebritiesPositionsProps = {
  celebritySectionObject: {
    id: number;
    title: string;
    celebritySectionType: string;
    position: number;
    celebrities: any[];
  };
  rotateAmount: number;
};
export const swapCelebritiesPositions = ({
  celebritySectionObject,
  rotateAmount
}: swapCelebritiesPositionsProps) => {
  return {
    ...celebritySectionObject,
    celebrities: [
      ...celebritySectionObject.celebrities.slice(
        celebritySectionObject.celebrities.length * rotateAmount
      ),
      ...celebritySectionObject.celebrities.slice(
        0,
        celebritySectionObject.celebrities.length * rotateAmount
      )
    ]
  };
};
