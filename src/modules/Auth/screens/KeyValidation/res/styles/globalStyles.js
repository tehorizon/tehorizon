import { StyleSheet, Platform } from 'react-native';
import APP_COLORS from '../colors';
import { design } from 'rn_fast_track_uilib';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: design['Header_Background_Primary_Color']?design['Header_Background_Primary_Color']:APP_COLORS.COLOR_WHITE,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
