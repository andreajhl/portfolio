/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  children?: ReactNode;
  className?: string | null;
} & NextLinkProps;

const Link = ({
  children = null,
  className = null,
  ...nextLinkProps
}: LinkProps) => (
  <NextLink {...nextLinkProps}>
    <a className={className}>{children}</a>
  </NextLink>
);

export { Link };
