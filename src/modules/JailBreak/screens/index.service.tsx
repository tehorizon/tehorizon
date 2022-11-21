import { ScreenTypes } from "../interfaces";
import i18n from "@localization";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@Profile/redux/actions";
import { useEffect } from "react";

/* component containing the business logic separated from view for
 api call trigger */
const JailBreakServiceComponent = ({ children }: ScreenTypes.screen) => {
  const dispatch = useDispatch();

  const onLogoutRequest = () =>
    dispatch(
      logoutRequest({
        postData: {
          token: "inavalid",
        },
      })
    );

  // cDM, resetState if Jail Break
  useEffect(() => {
    onLogoutRequest();
  }, []);

  return children({
    t: i18n.t,
    children,
  });
};

export default JailBreakServiceComponent;
