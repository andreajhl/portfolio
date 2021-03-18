/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

type LinkProps = {
  children?: ReactNode;
  className?: string | null;
  style?: CSSProperties;
} & NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({
  children = null,
  className = null,
  title = "",
  style = {},
  ...nextLinkProps
}: LinkProps) => (
  <NextLink {...nextLinkProps}>
    <a className={className} style={style} title={title}>
      {children}
    </a>
  </NextLink>
);

export { Link };
