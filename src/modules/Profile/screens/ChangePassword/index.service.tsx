import { useState } from "react";
import { userDefaultObj } from "@utils/commons";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "@redux/root-reducer";
import { updateProfileRequest } from "@Profile/redux/actions";
import { changePassword } from "@Profile/interfaces";
//analytics
import { makeStackMongo } from "@utils/horizonAnalytics";

const ChangePasswordService = ({ children, navigation }: any) => {
  const route = useRoute();
  //local states
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  //redux states
  const user = useAppSelector(
    (state) => state.userReducer.userInfo || userDefaultObj
  );
  const token = useAppSelector((state) => state.userReducer.token);
  const deviceInfo = useAppSelector((state) => state.appReducer.deviceInfo);

  //states

  //Actions
  const dispatch = useDispatch();
  const onUpdateProfileRequest = (data: any) =>
    dispatch(updateProfileRequest(data));

  const isUpperCaseLetter = /[A-Z]/.test(newPass);
  const isLowerCaseLetter = /[a-z]/.test(newPass);
  const isContainNumber = /[0-9]/.test(newPass);

  return children({
    user,
    currentPass,
    newPass,
    confirmPass,
    isUpperCaseLetter,
    isLowerCaseLetter,
    isContainNumber,
    navigation,
    setCurrentPass,
    setNewPass,
    setConfirmPass,
  } as changePassword);
};

export default ChangePasswordService;
