import React from "react";
import SubscriptionService from "./index.service";
import SubscriptionUI from "./index.ui";

export default function index() {
  return (
    <SubscriptionService>
      {(props: any) => <SubscriptionUI {...props} />}
    </SubscriptionService>
  );
}
