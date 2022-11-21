import React from "react";
import JailBreakComponent from "./index.ui";
import JailBreakServiceComponent from "./index.service";

const JailBreak = () => {
  //created separate component for business logic and view
  return (
    <JailBreakServiceComponent>
      {(props) => <JailBreakComponent {...props} />}
    </JailBreakServiceComponent>
  );
};

export default JailBreak;
