import React from "react";
import { Button, ButtonProps } from "react-native";
import { DragnDropLayout } from "@fast_track/src/AppConfig.json";

const LayoutButton = (props: ButtonProps) =>
  DragnDropLayout ? <Button {...props} /> : <></>;

export default LayoutButton;
