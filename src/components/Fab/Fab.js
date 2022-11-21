import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPendingOrderStatusRequest } from "@delivery/redux/actions";
import Menu from "./Menu";
import FabListing from "./FabListing";
import { EventRegister } from "react-native-event-listeners";
import Draggable from "react-native-draggable";

import { CustomText } from "@components";
import { borderColor, borderWidth } from "@utils/genericStyles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default Fab = () => {
  const [showMenuList, setShowMenuList] = useState(false);
  const [marginBottomFabList, setMarginBottomFabList] = useState(
    new Animated.Value(60)
  );
  const pan = useRef(new Animated.ValueXY()).current;
  const [fab_image_selected, setFab_image_selected] = useState("");
  const [fab_image_unselected, setFab_image_unselected] = useState("");
  const [fab_background_color, setFab_background_color] = useState("");
  const [section_list, setSection_list] = useState([]);
  const [fabList, showFabList] = useState(false);
  const [fabButtonDisable, setFabButtonDisable] = useState(false);
  let isLoadingData = useSelector((state) => state.appReducer.isLoading);
  const dispatch = useDispatch();
  const getPendingOrderStatusListing = () =>
    dispatch(getPendingOrderStatusRequest());
  let state = useSelector((state) => state);
  let { deliveryDetailReducer } = state;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x:
            pan.x._value > windowWidth - 80
              ? windowWidth - 80
              : pan.x._value < 30
              ? 30
              : pan.x._value,
          y:
            pan.y._value > windowHeight - 200
              ? windowHeight - 200
              : pan.y._value < 100
              ? 100
              : pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  let _menu = null;

  const setMenuRef = (ref) => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
    setFabButtonDisable(false);
  };

  const showMenu = () => {
    _menu.show();
    setFabButtonDisable(true);
  };

  EventRegister.addEventListener("fabListner", (data) => {
    getPendingOrderStatusListing();
  });

  useEffect(() => {
    getPendingOrderStatusListing();
  }, []);

  useEffect(() => {
    if (
      deliveryDetailReducer &&
      deliveryDetailReducer.pendingOrderStatus &&
      deliveryDetailReducer.pendingOrderStatus.fab_ui
    ) {
      const { fab_image_selected, fab_image_unselected, fab_background_color } =
        deliveryDetailReducer.pendingOrderStatus.fab_ui;
      setFab_image_selected(fab_image_selected);
      setFab_image_unselected(fab_image_unselected);
      setFab_background_color(fab_background_color);
      const { section_list } =
        deliveryDetailReducer.pendingOrderStatus.pending_orders[0];
      setSection_list(section_list);
    }
  }, [
    isLoadingData,
    deliveryDetailReducer &&
      deliveryDetailReducer.pendingOrderStatus &&
      deliveryDetailReducer.pendingOrderStatus.fab_ui,
  ]);

  return (
    <View style={Platform.OS == "ios" ? styles.fabIOS : ""}>
      {/* Menu container */}
      {/*{section_list.length > 0 && <Animated.View*/}
      {/*    style={{*/}
      {/*        transform: [{ translateX: pan.x }, { translateY: Animated.subtract(pan.y, marginBottomFabList) }],*/}
      {/*        ...StyleSheet.absoluteFillObject,*/}
      {/*    }}>*/}
      {/*    <Menu*/}
      {/*        handleClose={() => {*/}
      {/*            setShowMenuList(false)*/}
      {/*        }}*/}
      {/*        ref={setMenuRef}>*/}
      {/*        <FabListing*/}
      {/*            ordersList={section_list}*/}
      {/*            handleClose={() => {*/}
      {/*                setShowMenuList(false)*/}
      {/*            }}*/}
      {/*            hideMenu={hideMenu}*/}
      {/*            handleClose={() => {*/}
      {/*                hideMenu()*/}
      {/*                setShowMenuList(false)*/}
      {/*            }}*/}
      {/*            onLayoutChange={(val) => setMarginBottomFabList(new Animated.Value(val))}*/}
      {/*        />*/}
      {/*    </Menu>*/}
      {/*</Animated.View>}*/}

      {/*Fab button  */}
      {section_list.length > 0 && (
        <Draggable
          disabled={fabButtonDisable}
          onShortPressRelease={() => showFabList(!fabList)}
          x={100}
          y={88}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.box,
              { backgroundColor: "#" + fab_background_color },
            ]}
            onPress={() => {
              showMenu();
              setShowMenuList(true);
              getPendingOrderStatusListing();
            }}
          >
            {!showMenuList && (
              <View
                style={[
                  styles.countContainer,
                  { backgroundColor: "#" + fab_background_color },
                ]}
              >
                <View style={styles.countTextContainer}>
                  <CustomText style={{ color: "white", fontSize: 10 }}>
                    {section_list.length}
                  </CustomText>
                </View>
              </View>
            )}
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: showMenuList ? fab_image_selected : fab_image_unselected,
                }}
              />
            </View>
          </TouchableOpacity>
          <Menu
            handleClose={() => {
              setShowMenuList(false);
              setFabButtonDisable(false);
            }}
            ref={setMenuRef}
          >
            <FabListing
              ordersList={section_list}
              hideMenu={hideMenu}
              handleClose={() => {
                hideMenu();
                setShowMenuList(false);
              }}
              onLayoutChange={(val) =>
                setMarginBottomFabList(new Animated.Value(val))
              }
            />
          </Menu>
        </Draggable>
      )}

      {/*{section_list.length > 0 && <Animated.View*/}
      {/* collapsable={false}*/}
      {/*    style={{*/}
      {/*        transform: [{ translateX: pan.x }, { translateY: pan.y }],*/}
      {/*        zIndex: 99,*/}
      {/*        position: 'absolute',*/}
      {/*        marginTop: pan.y._value > 0 ? 0 : 100,*/}
      {/*    }}*/}
      {/*    {...panResponder.panHandlers}*/}
      {/*>*/}
      {/*    <TouchableOpacity*/}
      {/*        activeOpacity={1}*/}
      {/*        style={[styles.box, { backgroundColor: "#" + fab_background_color }]}*/}
      {/*        onPress={() => {*/}
      {/*            showMenu()*/}
      {/*            setShowMenuList(true)*/}
      {/*            getPendingOrderStatusListing()*/}
      {/*        }} >*/}
      {/*        {!showMenuList && <View style={[styles.countContainer, { backgroundColor: "#" + fab_background_color }]}>*/}
      {/*            <View style={styles.countTextContainer}>*/}
      {/*                <CustomText style={{ color: 'white', fontSize: 10 }}>{section_list.length}</CustomText>*/}
      {/*            </View>*/}
      {/*        </View>}*/}
      {/*        <View style={styles.imageContainer}>*/}
      {/*            <Image*/}
      {/*                style={styles.image}*/}
      {/*                source={{*/}
      {/*                    uri:*/}
      {/*                        showMenuList ?*/}
      {/*                            fab_image_selected :*/}
      {/*                            fab_image_unselected*/}
      {/*                }}*/}
      {/*            />*/}
      {/*        </View>*/}
      {/*    </TouchableOpacity>*/}
      {/*</Animated.View>}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 27,
    ...borderWidth(2),
    ...borderColor("white"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "center",
  },
  box: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  countContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    position: "absolute",
    top: 2,
    right: 0,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  countTextContainer: {
    height: 18,
    width: 18,
    borderRadius: 9,
    ...borderColor("white"),
    ...borderWidth(1),
    justifyContent: "center",
    alignItems: "center",
  },
  fabIOS: {
    zIndex: 99,
  },
});
