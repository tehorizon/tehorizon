import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { design } from "rn_fast_track_uilib";
import { Pie } from "@HybridComponents/Chart";

import { CustomText } from "@components";
import { PRIMARY, PRIMARY_EXTRABOLD } from "@fonts";
import {
  marginVertical,
  paddingHorizontal,
  paddingVertical,
} from "@utils/genericStyles";

const OrderStatusCard = (props) => {
  //props
  const { style, orderStatusData } = props;
  console.log("orderStatusData: ", orderStatusData);

  //style
  const {
    mainView,
    titleText,
    descriptionText,
    titleView,
    statusText,
    statusImage,
  } = Styles;

  const _renderStatusImage = (order_statuses) => {
    const length = order_statuses.length;
    const pieSections = [];
    let pieInnerImage = "";
    order_statuses.map((status) => {
      if (status.is_selected) {
        pieInnerImage = status.order_status_image_url;
      }
      const pieSection = {
        percentage: status.progress_percentage,
        color: "#" + status.order_status_line_color,
      };
      pieSections.push(pieSection);
    });
    return (
      <View style={{ alignItems: "center", marginTop: 16, marginBottom: 26 }}>
        <Pie
          radius={80}
          innerRadius={70}
          sections={pieSections}
          dividerSize={2}
          // strokeCap={'butt'}
        />

        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: pieInnerImage }}
            style={{ width: 77, height: 64 }}
            resizeMode={"contain"}
          />
        </View>
      </View>
      // <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      //     {
      //         order_statuses.map((status, index) => {
      //             const {
      //                 order_status_text = "",
      //                 order_status_text_color = design['Text_Primary_Color'],
      //                 order_status_image_url = "",
      //                 order_status_line_color = design['Text_Primary_Color']
      //             } = status
      //             return (
      //                 <View>
      //                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
      //                         <Image source={{uri: order_status_image_url}} style={statusImage}/>
      //
      //                         {
      //                             index !== (length - 1) &&
      //                             <View style={{
      //                                 width: 37,
      //                                 height: 2,
      //                                 backgroundColor: `#${order_status_line_color}`
      //                             }}/>
      //                         }
      //                     </View>
      //                     <CustomText style={{...statusText, color: `#${order_status_text_color}`}}>
      //                         {order_status_text}
      //                     </CustomText>
      //                 </View>
      //             )
      //         })
      //     }
      // </View>
    );
  };

  const {
    order_section_title = "",
    estimated_delivery_time = "",
    order_statuses = [],
  } = orderStatusData;

  return (
    <View style={[mainView, style]}>
      <View style={titleView}>
        <CustomText style={titleText}>{order_section_title}</CustomText>
      </View>

      <CustomText style={descriptionText}>{estimated_delivery_time}</CustomText>

      {order_statuses.length !== 0 && _renderStatusImage(order_statuses)}
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: design["Background_Secondary_Color"],
    ...paddingHorizontal(11),
    ...paddingVertical(18),
    alignItems: "center",
  },
  titleView: {
    marginBottom: 5,
  },
  titleText: {
    fontSize: 15,
    fontFamily: PRIMARY_EXTRABOLD,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: PRIMARY,
    color: design["Text_Secondary_Color"],
  },
  statusesView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  statusImage: {
    width: 32,
    height: 32,
    ...marginVertical(5),
  },
  statusText: {
    width: 65,
    fontSize: 12,
    fontFamily: PRIMARY,
    textAlign: "center",
    marginLeft: -15,
  },
  lineView: {
    width: 37,
    height: 2,
    backgroundColor: "red",
  },
});

export default OrderStatusCard;
