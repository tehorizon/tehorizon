import path from "path";
import { useLinkTo as useLinkToNative } from "@react-navigation/native";
import { Linking as NLinking, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

const relativePath = (location) => {
  const index = location.pathname.lastIndexOf("/");
  const loc = location.pathname.substr(0, index);
  return loc;
};

export async function setItem(key, data) {
  await AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  const data = AsyncStorage.getItem(key);
  return data;
}

export function remove(key) {
  const data = AsyncStorage.removeItem(key);
  return data;
}

const colorCheckAndCorrect = (color = "") => {
  let okayColor = "black";

  if (!color) {
    return okayColor;
  }

  if (!color.toString().startsWith("#")) {
    okayColor = "#" + color;
  }

  return okayColor;
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  let cbRef = useRef(); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    console.log("here useEffect", cbRef.current);
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const getSortedLayout = (layout, unsortedArray, itemKey) => {
  let sortSections = [...unsortedArray];
  let start = 0,
    lIndex = 0;
  while (lIndex < layout.length) {
    for (var a = 0; a < sortSections.length; a++) {
      if (
        layout[lIndex]?.toLowerCase() == sortSections[a][itemKey]?.toLowerCase()
      ) {
        let temp = sortSections[start];
        sortSections[start] = sortSections[a];
        sortSections[a] = temp;
        start++;
        break;
      }
    }
    lIndex++;
  }
  return sortSections;
};

const getLayoutFromArray = (layout, sortSections, itemKey) => {
  let sortLayout = [...layout];
  let start = 0,
    sIndex = 0;
  while (sIndex < sortSections.length) {
    for (var a = 0; a < sortLayout.length; a++) {
      if (
        sortLayout[a]?.toLowerCase() ==
        sortSections[sIndex][itemKey]?.toLowerCase()
      ) {
        let temp = sortLayout[start];
        sortLayout[start] = sortLayout[a];
        sortLayout[a] = temp;
        start++;
        break;
      }
    }
    sIndex++;
  }
  return sortLayout;
};

const useLinkTo = () => {
  const linkToN = useLinkToNative();

  const linkTo = (url) => {
    if (
      Platform.OS != "web" ||
      url?.includes("https://") ||
      url?.includes("http://")
    ) {
      NLinking.openURL(url);
    } else {
      // handle deeplink
      let deeplink = url?.split("://");
      if (deeplink?.length > 1) {
        linkToN(`/${deeplink[1]}`);
      }
    }
  };
  return linkTo;
};

export {
  path,
  relativePath,
  colorCheckAndCorrect,
  usePrevious,
  useStateCallback,
  getSortedLayout,
  getLayoutFromArray,
  useLinkTo,
};
