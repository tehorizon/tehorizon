import { getOutletsMaps } from "./apis/outlet-api";
import { outletParamsMaps } from "./Interfaces";

const GetOutletsWithMaps = async (token: string, params: outletParamsMaps) => {
  try {
    if (token === "") throw new Error("Token not found");
    if (params.language === "") throw new Error("Language not found");
    const outlets = await getOutletsMaps(token, params);

    return outlets?.data;
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};
export default GetOutletsWithMaps;
