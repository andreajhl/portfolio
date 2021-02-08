import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";

export interface NavLinkProps {
  to: string;
  as: string;
}

// Normalize and split paths into their segments
const getSegment = (path) =>
  new URL(path, "https://localhost:3000").pathname.split("/").filter(Boolean);

const getIsActive = (asPath, as, exact) => {
  const currentPath = getSegment(asPath);
  const targetPath = getSegment(as);
  // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end
  return (
    currentPath.length >= targetPath.length &&
    targetPath.every((segment, index) => currentPath[index] === segment) &&
    (!exact || targetPath.length === currentPath.length)
  );
};

const NavLink = ({
  to: href,
  as = href,
  exact = false,
  activeClassName = "active",
  activeStyle = {},
  className: classes = "",
  children = null,
  ...props
}) => {
  const { asPath } = useRouter();
  // const isActive = pathToRegexp(as || href, [], {
  //   sensitive: true,
  //   end: Boolean(exact)
  // }).test(asPath);

  const isActive = getIsActive(asPath, as, exact);

  const className = (classes + " " + (isActive ? activeClassName : "")).trim();
  const style = isActive ? activeStyle : null;

  return (
    <Link href={href} as={as} {...props}>
      <a className={className} {...props} style={style}>
        {children}
      </a>
    </Link>
  );
};

export { NavLink };
