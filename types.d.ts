// types.d.ts or next-env.d.ts

import { ReactNode, ComponentType } from "react";
import { NextPage } from "next";

declare module "next" {
  interface NextPageWithLayout<P = {}> extends NextPage<P> {
    Layout: ComponentType<{ children: ReactNode } & P>;
  }
}
