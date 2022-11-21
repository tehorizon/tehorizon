import { ColorValue } from "react-native";

export const borderWidth = (value: number) => ({
  borderEndWidth: value,
  borderStartWidth: value,
  borderBottomWidth: value,
  borderTopWidth: value,
  borderLeftWidth: value,
  borderRightWidth: value,
});

export const borderColor = (value: ColorValue) => ({
  borderTopColor: value,
  borderRightColor: value,
  borderLeftColor: value,
  borderBottomColor: value,
  borderEndColor: value,
  borderStartColor: value,
});

export const paddingHorizontal = (value: number) => ({
  paddingLeft: value,
  paddingRight: value,
});

export const marginHorizontal = (value: number) => ({
  marginLeft: value,
  marginRight: value,
});

export const paddingVertical = (value: number) => ({
  paddingTop: value,
  paddingBottom: value,
});

export const marginVertical = (value: number) => ({
  marginTop: value,
  marginBottom: value,
});

export const padding = (value: number) => ({
  ...paddingVertical(value),
  ...paddingHorizontal(value),
});
export const margin = (value: number) => ({
  ...marginVertical(value),
  ...marginHorizontal(value),
});
