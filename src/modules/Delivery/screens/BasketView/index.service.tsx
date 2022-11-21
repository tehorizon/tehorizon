import { ScreenTypes } from "../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { getEncyptedString } from "@network";
import { EventRegister } from "react-native-event-listeners";

interface PARAMS {
  [key: string]: any;
}
const BasketViewScreen = ({
  children,
  navigation,
  route,
}: ScreenTypes.screen) => {
  const finalData = route?.params?.data || {};
  //States
  const [body, setBody] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    setupData();
  }, []);

  const navigationStateChange = (request: { url: string }) => {
    try {
      if (request.url.includes("is_success=true")) {
        let params = request.url.split("?")[1].split("&");
        let paramsToPass: PARAMS = {};
        for (let index = 0; index < params.length; index++) {
          const element = params[index];
          if (element?.split("=")?.length > 1) {
            paramsToPass[element.split("=")[0]] = element.split("=")[1];
          }
        }
        handleGoToOrderStatusScreen(paramsToPass);
      }
      if (request.url.startsWith("http")) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToOrderStatusScreen = (params: PARAMS) => {
    try {
      //OrderIdleTimer.clearTimer();
    } catch (error) {
      console.log({ error });
    }
    let orderInformation = {
      ...params,
      merchant_id: finalData.merchantID,
      outlet_id: finalData.outletID,
      editOrderTimerValue: finalData.editOrderTimerValue,
      editOrderIdleTimerValue: finalData.editOrderIdleTimerValue,
      isRedirectedFromHome: false,
      outletType: finalData.outletType,
    };
    console.log("order information", orderInformation);
    EventRegister.emit("fabListner", true);
    // dispatch(resetDataAfterSuccessfullyOrder({}))
    navigation.navigate("OrderStatus", orderInformation);
  };

  const setupData = async () => {
    try {
      setShowProgress(true);
      if (finalData.order_id === undefined) {
        delete finalData.order_id;
      }

      let aesDts = await getEncyptedString(finalData);

      let paramsToDecrypt = {
        location_id: "1",
      };
      // delete paramsToDecrypt.encryption_disable_key;
      let aesP = await getEncyptedString(paramsToDecrypt);
      let body = `__p=${aesP}&__dts=${aesDts}`;
      const encoded = encodeURI(body);
      setBody(encoded);
    } catch (error) {
      console.log(error, "pakistan");
    }
  };

  const onLoadEnd = useCallback(() => setShowProgress(false), []);

  const originWhitelist = [
    "https://*",
    "http://*",
    "entertainer://successorder",
  ];

  let source = {
    body: body,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    uri: route?.params?.url
      ? `${route.params.url}?theme=v6`
      : "https://entcartut.theentertainerme.com/delivery?theme=v6",
  };

  return children({
    source,
    showProgress,
    originWhitelist,
    //methods
    onLoadEnd,
    navigationStateChange,
  } as ScreenTypes.BasketView);
};

export default BasketViewScreen;
