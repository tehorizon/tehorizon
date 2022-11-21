import { getTabs } from "./apis/tabs-api";
interface params {
  category: string;
  location_id: number;
  language: string;
}

const GetTabs = async (token: string, params: params) => {
  try {
    if (token === "") throw new Error("Token not found");
    if (params.language === "") throw new Error("Language not found");
    const tabs = await getTabs(token, params);
    return tabs?.data;
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default GetTabs;
