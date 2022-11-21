import { StyleSheet } from "react-native";
import { design } from "rn_fast_track_uilib";
import { paddingHorizontal } from "@utils/genericStyles";

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: design["Background_Primary_Color"],
        flex: 1,
        ...paddingHorizontal(10),
      },
      cancelButton: {
        backgroundColor: "rgb(165,165,165)",
        marginBottom: 20,
      },
      deliveryDetailsCard:{ 
        marginBottom: 10, 
        marginTop: 14 
      },
      mb10:{
        marginBottom: 10

      },
      mb14:{ 
        marginBottom: 14 
      },
      mb20:{ 
        marginBottom: 20
      }
  });

  export default styles;