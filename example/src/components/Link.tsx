import React from "react";

import NextLink from "next/link";

import { getRoute, TypeSafePage } from "next-type-safe-routes";

type Props = {
  to: TypeSafePage;
  children: any;
};

const Link = ({ to, children, ...rest }: Props) => (
  <NextLink href={getRoute(to)} {...rest}>
    <a style={{ display: "block" }}>{children}</a>
  </NextLink>
);

export default Link;
