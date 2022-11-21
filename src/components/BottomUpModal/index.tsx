import React, {
  forwardRef,
  memo,
  ReactElement,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { design } from "rn_fast_track_uilib";
import { padding, margin } from "@utils/genericStyles";
import Modal from "@HybridComponents/Modal";
import { getFlipForRTLStyle } from "@localization";
import { SafeAreaView } from "react-native-safe-area-context";

interface BottomUpModalProps {
  children?: ReactElement | ReactElement[];
}
let behavior: "padding" | "height" =
  Platform.OS === "ios" ? "padding" : "height";
export interface BottomUpModalRef {
  toggleVisible: () => void;
}
const BottomUpModal = memo(
  forwardRef(({ children }: BottomUpModalProps, ref: Ref<BottomUpModalRef>) => {
    const [isVisible, updateModalVisiblity] = useState(false);

    useImperativeHandle(ref, () => ({
      toggleVisible,
    }));

    const toggleVisible = () => updateModalVisiblity(!isVisible);
    return (
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackButtonPress={toggleVisible}
        style={styles.zeroMargin}
        swipeDirection="down"
        backdropOpacity={0.87}
        onSwipeComplete={toggleVisible}
        onBackdropPress={toggleVisible}
      >
        <KeyboardAvoidingView
          behavior={behavior}
          style={[styles.bottomView, getFlipForRTLStyle()]}
        >
          <SafeAreaView edges={["bottom"]}>{children}</SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    );
  })
);

export default BottomUpModal;
const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: design.Background_Primary_Color,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...padding(24),
    paddingBottom: 0,
  },
  zeroMargin: {
    ...margin(0),
    justifyContent: "flex-end",
  },
});
