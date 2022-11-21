import React from "react";
import NotificationService from "./index.service";
import NotificationUI from "./index.ui";

export default () => {
  return (
    <NotificationService>
      {(props: any) => <NotificationUI {...props} />}
    </NotificationService>
  );
};
