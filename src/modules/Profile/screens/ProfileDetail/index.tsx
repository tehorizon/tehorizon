import { useNavigation } from "@react-navigation/core";
import React from "react";
import DetailService from "./index.service";
import DetailUI from "./index.ui";

const Detail = () => {
  const navigation = useNavigation();
  return (
    <DetailService navigation={navigation}>
      {(props: any) => <DetailUI {...props} />}
    </DetailService>
  );
};

export default Detail;
