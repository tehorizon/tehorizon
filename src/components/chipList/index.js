import { borderWidth } from "@utils/genericStyles";
import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import Chip from "../chip";
import { design } from "rn_fast_track_uilib";

const padding = 0;
const { width } = Dimensions.get("window");

export default class index extends Component {
  // state = {
  //   contentWidth: 0,
  // };
  // onContentSizeChange = (contentWidth, contentHeight) => {
  //   // Save the content height in state
  //   this.setState({ contentWidth: contentWidth });
  // };
  render() {
    // const scrollEnabled = this.state.contentWidth > width;
    const { chipsData, onDeleteChip } = this.props;
    return chipsData?.length > 0 ? (
      <View
        style={{
          paddingTop: padding,
          backgroundColor: design.Header_Background_Primary_Color || "#FFFFFF",
        }}
      >
        <ScrollView
          bounces={false}
          horizontal
          ref={(c) => (this.scroll = c)}
          showsHorizontalScrollIndicator={false}
          // removeClippedSubviews={true}
          // scrollEnabled={scrollEnabled}
          // onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.container}>
            {chipsData?.map((chipsItem, index) => {
              return (
                <Chip
                  value={chipsItem.title}
                  type="removable"
                  subType={
                    chipsItem.filter_type != "filters_selected_for_no"
                      ? "success"
                      : "danger"
                  }
                  onPress={() => onDeleteChip(chipsItem, index)}
                />
              );
            })}
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            paddingTop: padding,
          }}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    ...borderWidth(0),
    paddingLeft: 16,
  },
});
