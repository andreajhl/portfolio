import { ReactNode } from "react";

type MaybePropsI = {
  it: boolean;
  children: ReactNode;
  orElse?: ReactNode;
};

const Maybe = ({ it, children, orElse = null }: MaybePropsI) => (
  <>{it ? children : orElse}</>
);

export default Maybe;
