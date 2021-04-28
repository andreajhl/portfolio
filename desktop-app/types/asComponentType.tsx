type AsComponentType =
  | keyof JSX.IntrinsicElements
  | ((props: any) => JSX.Element);

export default AsComponentType;
