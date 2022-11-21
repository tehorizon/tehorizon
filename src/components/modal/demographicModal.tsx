import React from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import moment from "moment";
import i18n, { isRTL } from "@localization";
import { design } from "rn_fast_track_uilib";

import DemographicInput from "../Input/DemograficInput";
import CustomText from "../Text/Text";
import ProceedButton from "../Button/proceedButton";
import CountryPicker from "../modal/CountryPicker";
import SelectDateModal from "../modal/select_date_modal";
import SelectGenderModal from "../modal/select_gender_modal";
import CancelIcon from "@assets/images/close-icon.png";

import AuthBL from "@Auth/BL";

import { connect } from "react-redux";

import appboy from "@HybridComponents/AppBoy";
const { registerUserAppBoy } = appboy;

import { createStructuredSelector } from "reselect";
import {
  selectExposeFunction,
  selectAppConfigs,
  selectAppLoading,
} from "../../redux/appReducer/app.selectors";

import { setUser, setToken, setUserValues } from "@Profile/redux/actions";

import {
  setSkipMode,
  setAppLoading,
  setErrorObject,
  setDismissDemographic,
} from "../../redux/appReducer/app.actions";
import { PRIMARY_BOLD } from "@fonts";
import { padding } from "@utils/genericStyles";
import {
  selectUserInfo,
  selectUserToken,
} from "../../redux/userReducer/user.selectors";

//default

class Demographic extends React.Component<any, any> {
  state = {
    dob: "",
    date: moment().add(-13, "years").toDate(),
    showDatepicker: false,
    showGenderPicker: false,
    gender: "",
    showNationalityPicker: false,
    nationality: "",
    error: false,
    errorText: "",
    loadingOverlayActive: false,
  };

  handleDatePicker = () => {
    this.setState({ showDatepicker: true });
  };

  hideDatePicker = () => {
    if (Platform.OS === "android") {
      if (this.state.date !== undefined) {
        this.setState({
          date: moment(this.state.date, "YYYY-MM-DDTHH:mm:ss.sssZ").toDate(),
          dob: moment(this.state.date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
            "DD/MM/YYYY"
          ),
          showDatepicker: false,
        });
      }
    } else if (Platform.OS === "ios") {
      this.setState({
        date: moment(this.state.date, "YYYY-MM-DDTHH:mm:ss.sssZ").toDate(),
        dob: moment(this.state.date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
          "DD/MM/YYYY"
        ),
        showDatepicker: false,
      });
    }
    // this.setState({ showDatepicker: false });
  };

  handleDateChange = (event, date) => {
    if (Platform.OS === "android") {
      if (date !== undefined) {
        this.setState({
          date: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").toDate(),
          dob: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY"),
          showDatepicker: false,
        });
      }
    } else if (Platform.OS === "ios") {
      this.setState({
        date: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").toDate(),
        dob: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY"),
      });
    }
  };

  onUserUpdate = async (data: any) => {
    console.log("update-user-data ->>>> ", data);
    this.props.onSetAppLoading(true);
    this.makeAnalyticsStack("Demographics", "click_confirm");
    try {
      const userProfile = await AuthBL.demoGraphic({
        token: this.props.token,
        ...data,
        currency: this.props.user
          ? this.props.user.currency
          : this.props.appConfigs.defaultCurrency,
      });

      this.props.onSetUser(userProfile);
      // here we have to call dismiss modal function
      // const exposeData = {
      //   type: 'demographic',
      //   data: userProfile,
      // };
      // this.props.exposeFunction && this.props.exposeFunction(exposeData);
      this.props.onSetAppLoading(false);
      this.onDismissDemographicModalHandler();
      this.makeAnalyticsStack("Demographics", "update_user_success");
      console.log("demo graphic message: ", userProfile);
      registerUserAppBoy(userProfile);
    } catch (e) {
      console.log(e, "errorerror");

      this.props.onSetAppLoading(false);

      setTimeout(() => {
        this.makeAnalyticsStack("Demographics", "update_user_fail");
        this.props.onSetErrorObject({
          status: true,
          message: e.messageText,
        });
      }, 100);
    }
    return { true: "test" };
  };

  makeAnalyticsStack = async (
    screenName = "",
    action = "",
    category_id = "",
    categories = "",
    categories_analytics = "",
    location_id = 0,
    changeSequenceNumber = false
  ) => {
    const stackData = {
      current_screen: screenName,
      action: action,
      category_id: category_id,
      categories: categories,
      categories_analytics: categories_analytics,
      location_id: location_id,
      changeSequenceNumber: changeSequenceNumber,
    };
    //makeStackMongo(stackData);
    //resetStackObject();
    //const dataStack = await getStackArrayMongo();
    //console.log(dataStack, 'getStackArrayMongo');
  };

  messageHandler = (data: any) => {
    const { message, messageType, messageText } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          message,
          messageType,
          messageText,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  handleCancelOnDatePicker = () => {
    this.setState({ showDatepicker: false });
  };

  hideGenderPicker(gender: string) {
    this.setState({ showGenderPicker: false, gender: gender });
  }

  hideNationalityPicker(nationality: string) {
    this.setState({ showNationalityPicker: false, nationality: nationality });
  }

  handleNationality = () => {
    this.setState({ showNationalityPicker: true });
  };

  handleGender = () => {
    this.setState({ showGenderPicker: true });
  };

  handleProceed = () => {
    this.onUserUpdate({
      dateOfBirth: moment(this.state.dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
      nationality: this.state.nationality,
      gender: this.state.gender,
    });
  };

  getMinused13YearDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let minusedDate = new Date(year - 13, month, day);
    return minusedDate;
  };

  onDismissDemographicModalHandler = () => {
    this.props.onSetDismissDemographic(false);
  };

  render() {
    const {
      showNationalityPicker,
      showGenderPicker,
      showDatepicker,
      dob,
      date,
    } = this.state;

    return this.props.isVisible ? (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 30 : 0,
          ...StyleSheet.absoluteFillObject,
          backgroundColor: design["Background_Secondary_Color"]
            ? design["Background_Secondary_Color"]
            : "#FFFFFF",
        }}
      >
        <View
          style={{
            backgroundColor: design["Background_Secondary_Color"]
              ? design["Background_Secondary_Color"]
              : "#FFFFFF",
            height: "100%",
          }}
        >
          <CountryPicker
            isVisible={showNationalityPicker}
            handleDone={({ selectedCountry }) => {
              console.log(selectedCountry);
              this.hideNationalityPicker(selectedCountry);
            }}
            isRTL={isRTL}
            i18n={i18n}
            title={i18n.t("COUNTRY_OF_RESI_STRING")}
          />

          <SelectGenderModal
            isVisible={showGenderPicker}
            handleDone={(gender) => {
              console.log(gender);
              this.hideGenderPicker(gender);
            }}
          />

          <SelectDateModal
            isVisible={showDatepicker}
            date={date}
            handleDateChange={this.handleDateChange}
            handleDone={this.hideDatePicker}
            handleCancel={this.handleCancelOnDatePicker}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomText
                style={{
                  ...padding(10),
                  marginTop: 10,
                  fontFamily: PRIMARY_BOLD,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                {i18n.t("Tell_us_about_you")}
              </CustomText>
              {this.props.appConfigs.demographics_form_cancelable && (
                <TouchableOpacity
                  onPress={this.onDismissDemographicModalHandler}
                >
                  <Image
                    source={CancelIcon}
                    style={{ height: 25, width: 25, marginRight: 15 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
            <CustomText
              style={{
                ...padding(10),
                fontFamily: PRIMARY_BOLD,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {i18n.t("please_fill_the_info")}
            </CustomText>

            <DemographicInput
              value={this.state.nationality}
              greyTip="Nationality"
              onPress={this.handleNationality}
            />

            <DemographicInput
              value={this.state.gender}
              greyTip="Gender"
              onPress={this.handleGender}
            />

            <DemographicInput
              value={dob}
              greyTip="Date of Birth"
              onPress={this.handleDatePicker}
            />

            <ProceedButton handleProceed={this.handleProceed} />
          </View>
        </View>
      </SafeAreaView>
    ) : null;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  user: selectUserInfo,
  appConfigs: selectAppConfigs,
  token: selectUserToken,
  loadingOverlayActive: selectAppLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUser: (data) => dispatch(setUser(data)),
  onSetToken: (data) => dispatch(setToken(data)),
  onSetSkipMode: (data) => dispatch(setSkipMode(data)),
  onSetUserValues: (data) => dispatch(setUserValues(data)),
  onSetAppLoading: (data) => dispatch(setAppLoading(data)),
  onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  onSetDismissDemographic: (data) => dispatch(setDismissDemographic(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demographic);
