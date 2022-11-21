import { getOutlets } from "./apis/outlet-api";
import { outletParams } from "./Interfaces";

const GetOutlets = async (token: string, params: outletParams) => {
  try {
    if (token === "") throw new Error("Token not found");

    const tabParams = params["tabsParams"];

    delete params["tabsParams"];
    const data = {
      ...params,
      ...tabParams,
    };

    const outlets = await getOutlets(token, data);

    return outlets?.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default GetOutlets;
