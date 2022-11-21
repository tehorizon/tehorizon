import { outletSearch } from "./apis/outlet-api";
import { outletSearchApiParams } from "./Interfaces";

const OutletSearch = async (token: string, params: outletSearchApiParams) => {
  try {
    if (token === "") throw new Error("Token not found");
    if (params.language === "") throw new Error("Language not found");

    const outlets = await outletSearch(token, params);

    return outlets?.data;
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default OutletSearch;
