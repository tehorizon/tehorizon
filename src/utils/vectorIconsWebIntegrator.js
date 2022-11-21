import FontAwesome_ttf from "react-native-vector-icons/Fonts/FontAwesome.ttf";
import Entypo_ttf from "react-native-vector-icons/Fonts/Entypo.ttf";
import Ionicons_ttf from "react-native-vector-icons/Fonts/Ionicons.ttf";
import AntDesign_ttf from "react-native-vector-icons/Fonts/AntDesign.ttf";
import Feather_ttf from "react-native-vector-icons/Fonts/Feather.ttf";
import MaterialIcons_ttf from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import Fontisto_ttf from "react-native-vector-icons/Fonts/Fontisto.ttf";
import MuseoSans100 from "@fast_track/assets/fonts/museosans_100-webfont.ttf";
import MuseoSans300 from "@fast_track/assets/fonts/museosans_300-webfont.ttf";
import MuseoSans500 from "@fast_track/assets/fonts/museosans_500-webfont.ttf";
import MuseoSans700 from "@fast_track/assets/fonts/museosans_700-webfont.ttf";

const IconsCSS = `
@font-face {
  src: url(${FontAwesome_ttf});
  font-family: FontAwesome;
}
@font-face {
  src: url(${Entypo_ttf});
  font-family: Entypo;
}
@font-face {
    src: url(${Ionicons_ttf});
    font-family: Ionicons;
}
@font-face {
    src: url(${AntDesign_ttf});
    font-family: AntDesign;
}
@font-face {
    src: url(${Feather_ttf});
    font-family: Feather;
}
@font-face {
  src: url(${MaterialIcons_ttf});
  font-family: MaterialIcons;
}
@font-face {
  src: url(${Fontisto_ttf});
  font-family: Fontisto;
}
@font-face {
  src: url(${MuseoSans100});
  font-family: MuseoSans100;
}
@font-face {
  src: url(${MuseoSans300});
  font-family: MuseoSans300;
}
@font-face {
  src: url(${MuseoSans500});
  font-family: MuseoSans500;
}
@font-face {
  src: url(${MuseoSans700});
  font-family: MuseoSans700;
}
`;

const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) style.styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));
document.head.appendChild(style);
