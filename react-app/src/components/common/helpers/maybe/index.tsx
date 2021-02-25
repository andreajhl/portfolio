import { ReactNode } from "react";

type MaybePropsI = {
  it: boolean;
  children: ReactNode;
  orElse?: ReactNode;
};

/**
 * For rendering a component conditionally.
 * Its purpose is to provide a useful monad around data which may or may not exist at runtime.
 *
 * More info coming soon...
 */

const Maybe = ({ it, children, orElse = null }: MaybePropsI) => (
  <>{it ? children : orElse}</>
);

export default Maybe;
