import React from "react";

import NextLink from "next/link";

import { getRoute, TypeSafePage } from "next-type-safe-pages";

type Props = {
  to: TypeSafePage;
  children: React.ReactElement;
};

const Link = ({ to, children, ...rest }: Props) => (
  <NextLink href={getRoute(to)} {...rest}>
    {children}
  </NextLink>
);

export default Link;
