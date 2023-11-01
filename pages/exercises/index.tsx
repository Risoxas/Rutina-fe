import React from "react";
import UnderConstruction from "../../components/404";
import { Layout } from "../../components/Layout";
import { NextPageWithLayout } from "next";

const ExercisePage: NextPageWithLayout = () => {
  return <UnderConstruction />;
};

ExercisePage.Layout = Layout;

export default ExercisePage;
