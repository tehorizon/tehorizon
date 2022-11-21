import { useCallback, useEffect, useRef, useState } from "react";
import { ScreenTypes } from "../../interfaces";
import { useDispatch } from "react-redux";
import { BackHandler } from "react-native";
import { setAppLoading } from "@redux/appReducer/app.actions";

const UrlService = ({ children, navigation, route }: ScreenTypes.urlScreen) => {
  const { name, urls, hero_images_360, indexToMove } = route.params;

  //states
  const [isLoadingImage, setLoadingImage] = useState(true);

  const dispatch = useDispatch(); // dispatch action to reducer

  // dispach
  const onAppLoading = (status: boolean) => dispatch(setAppLoading(status));

  // cDM, add listeners
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    // componentWillUnMount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    onAppLoading(false);
    navigation.goBack();
    return true;
  };

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const onImageLoaded = useCallback(() => setLoadingImage(false), []);

  return children({
    name,
    indexToMove,
    urls,
    hero_images_360,
    isLoadingImage,
    onImageLoaded,
    navigation,
  } as ScreenTypes.URL);
};

export default UrlService;
