import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CustomText, CustomCheckbox3 } from "@components";
import { paddingHorizontal, paddingVertical } from "@utils/genericStyles";
import { design } from "rn_fast_track_uilib";
import { getFlipForRTLStyle } from "@localization";
class LocationList extends Component {
  state = {
    data: [],
    selectedLocation: this.props.selectedLocation,
    selectedId: "",
    imagePath: null,
  };

  getSelectedLocation = () => {
    return this.state.selectedLocation;
  };

  onClickLocationHandler = (data) => {
    this.setState({ selectedId: data.id, selectedLocation: data });
  };

  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.locationList !== this.props.locationList ||
      nextProps.locationList?.legth !== this.props.locationList?.length ||
      // nextProps.selectedLocation !== this.props.selectedLocation ||
      nextProps.hasLocationHeader !== this.props.hasLocationHeader
    );
  };
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.props.hasLocationHeader) {
            this.props.onDonehandler(index);
          } else {
            this.onClickLocationHandler(index);
          }
        }}
        testID={item.name}
        style={styles.mainView}
      >
        <View style={styles.subView}>
          <Image source={item.flag} style={styles.image} />
          <CustomText style={styles.title}>{item.name}</CustomText>
        </View>
        <CustomCheckbox3
          checked={this.state.selectedLocation?.id === item?.id}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        testID="locationList"
        style={[styles.list, getFlipForRTLStyle()]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        data={this.props.locationList}
        renderItem={this.renderItem}
        extraData={this.state.selectedLocation}
        ListFooterComponent={<View style={styles.bottomMargin} />}
        ListHeaderComponent={<View style={styles.topMargin} />}
        ListEmptyComponent={<ActivityIndicator size="large" />}
      />
    );
  }
}

export default LocationList;

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    ...paddingHorizontal(14.5),
    ...paddingVertical(16),
    borderBottomWidth: 1,
    borderBottomColor: design.Border_Color,
    backgroundColor: design.Location_List_BG,
  },
  image: {
    width: 21,
    height: 15,
    marginRight: 8.5,
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: design.Location_List_Title,
  },
  subView: {
    flex: 1,
    flexDirection: "row",
    marginRight: 1.5,
  },
  bottomMargin: {
    height: 30,
    backgroundColor: design.Location_List_BG,
  },
  topMargin: {
    height: 5,
    backgroundColor: design.Location_List_BG,
  },
  list: {
    backgroundColor: design.Location_List_BG,
  },
});
