import React from "react";
import Primary from "./FilltersTabView";
import Secondry from "./OutletFilters";

type themeTypes = "primary" | "secondry";

const Filters = ({
  theme = "primary",
  layout,
  categoryKey,
}: {
  theme: themeTypes;
  layout: any;
  categoryKey: string;
}) => {
  if (theme == "primary") {
    return <Primary layout={layout} categoryKey={categoryKey} />;
  }
  return <Secondry categoryKey={categoryKey} />;
};

export default Filters;
