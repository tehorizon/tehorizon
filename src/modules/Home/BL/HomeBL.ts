import { homeApi } from "./apis";
import { HomeAPIdataType } from "./Interfaces";

const HomeBL = async (data: HomeAPIdataType) => {
  try {
    if (data.token === "") throw new Error("Token not found");

    const HomeApiResult = await homeApi(data);

    let upgrade = {
      show_upgrade_button: HomeApiResult.data.show_upgrade_button,
      upgrade_button_background_color:
        HomeApiResult.data.upgrade_button_background_color,
      upgrade_button_title: HomeApiResult.data.upgrade_button_title,
      upgrade_button_title_color: HomeApiResult.data.upgrade_button_title_color,
    };
    return { homeSections: HomeApiResult.data.home_sections, upgrade };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default HomeBL;
