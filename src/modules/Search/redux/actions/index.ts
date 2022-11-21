import { outletItemInterface } from "@fast_track/src/modules/Outlet/BL/Interfaces";
import * as Actions from "../types";

const searchOutlet = (payload: any) => ({
  type: Actions.SEARCH_OUTLET,
  payload,
});

const searchOutletSuccess = (payload: outletItemInterface[]) => ({
  type: Actions.SEARCH_OUTLET_SUCCESS,
  payload,
});

const pushQuery = (payload: string[]) => ({
  type: Actions.SEARCH_ADD_RECENT_QUERY,
  payload,
});

const resetSearch = () => ({
  type: Actions.RESET_SEARCH,
});

export { searchOutlet, searchOutletSuccess, resetSearch, pushQuery };
