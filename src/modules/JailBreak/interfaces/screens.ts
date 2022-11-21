import { StackNavigationProp } from "@react-navigation/stack";

export interface screen {
  children?: any;
}

export interface jailbreak extends screen {
  t: Function;
}
