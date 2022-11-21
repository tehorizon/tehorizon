import React from "react";
import { TouchableOpacity, Switch } from "react-native";
import { CustomText } from "@components";
import { design } from "rn_fast_track_uilib";
import styles from "../screens/UserPreferences/styles";
import { isRTL } from "@localization";
import { Feather } from "@expo/vector-icons";

const PreferenceOption = ({
  testID,
  title,
  onPress,
  value,
  onChange,
  disable = false,
  dangerous = false,
}: any) => {
  return (
    <TouchableOpacity
      testID={testID || title}
      style={styles.preferenceOption}
      onPress={onPress}
      disabled={disable}
    >
      <CustomText
        isRTL={isRTL}
        style={[
          styles.preferenceOptionTitle,
          dangerous && styles.dangerousColor,
        ]}
      >
        {title}
      </CustomText>
      {onPress && (
        <Feather
          color={
            dangerous
              ? styles.dangerousColor.color
              : design.Text_Secondary_Color
          }
          name="chevron-right"
          size={22}
          style={{ marginRight: 3 }}
        />
      )}
      {onChange && (
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ true: design.Primary_Color }}
          thumbColor={design.Background_Primary_Color}
          activeThumbColor={design.Background_Primary_Color}
          style={styles.toggleSwitch}
        />
      )}
    </TouchableOpacity>
  );
};

export default PreferenceOption;
