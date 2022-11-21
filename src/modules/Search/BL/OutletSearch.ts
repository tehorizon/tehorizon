import { outletSearch } from "./apis/outlet-api";
import { SearchPostData } from "../interfaces/requests";

const OutletSearch = async ({ token, params }: SearchPostData) => {
  try {
    const outlets = await outletSearch(token, params);
    console.log(outlets?.data);

    return outlets?.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default OutletSearch;
