import { design } from "rn_fast_track_uilib";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  Ref,
  ReactChild,
} from "react";
import { Animated, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

interface PROPS {
  modalHeight: number;
  children: ReactChild;
  header: ReactChild;
  onBackButtonPress?: () => boolean;
}

export interface BottomSheetRef {
  open: Function;
  close: Function;
}

const BottomSheet = React.memo(
  forwardRef((props: PROPS, ref: Ref<BottomSheetRef>) => {
    //ref
    const modalizeRef = useRef<Modalize>(null);

    //props
    const {
      modalHeight = 500,
      children,
      header = () => <></>,
      onBackButtonPress,
    } = props;

    useImperativeHandle(ref, () => ({
      open: onOpen,
      close: onClose,
      children: children,
    }));

    const onOpen = () => {
      modalizeRef.current?.open();
    };

    const onClose = () => {
      modalizeRef.current?.close();
    };

    const renderBody = () => {
      return <Animated.View style={styles.mainView}>{children}</Animated.View>;
    };

    return (
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalHeight={modalHeight}
          closeOnOverlayTap={false}
          withHandle={false}
          panGestureEnabled={false}
          scrollViewProps={{
            scrollEnabled: false,
          }}
          HeaderComponent={header}
          customRenderer={renderBody()}
          onBackButtonPress={onBackButtonPress}
        />
      </Portal>
    );
  })
);

export default BottomSheet;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: design.Background_Primary_Color,
  },
});
