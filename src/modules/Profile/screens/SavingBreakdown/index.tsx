import React from "react";
import SavingBreakdownService from "./index.service";
import SavingBreakdownUI from "./index.ui";

export default function SavingBreakdown() {
  return (
    <SavingBreakdownService>
      {(props: any) => <SavingBreakdownUI {...props} />}
    </SavingBreakdownService>
  );
}
