interface datatype {
  loadingOverlayActive: Boolean;
  errorText: string;
  error: boolean;
  outletList: OutletItemInterface[];
  selectedFilter: SelectedFilterDataType | null;
  searched: boolean;
  searchText: string;
}

interface OutletItemInterface {
  merchant_id: number;
  outlet_id: number;
  merchantName: string;
  outletName: string;
  merchantLogo: string;
  locked: boolean;
  attributes: OutletAttributesInterface[];
  distance: number;
  favourite: boolean;
}

interface OutletAttributesInterface {
  type: string;
  value: string;
}

interface SelectedFilterDataType {
  newOffer: boolean;
  selectedType: string;
  selectedCuisine: Array<string>;
  selectedAmenities: SelectedAmenitiesDataType;
}

interface FilterDataType {
  newOffer: boolean;
  selectedType: string;
  selectedCuisine: Array<string>;
  selectedAmenities: SelectedAmenitiesDataType;
}

interface SelectedAmenitiesDataType {
  [key: string]: {
    name: string;
    flag: boolean;
  };
}

interface onOutletClickDataType {
  merchant_id: number;
  outlet_id: number;
  favourite: boolean;
}

interface ErrorData {
  error: boolean;
  message: string;
}

interface callBacks {
  onCancle: () => void;
  onOutletClick: (data: onOutletClickDataType) => void;
  search: (data: string) => void;
  addFilter: (data: FilterDataType, searctText: string) => void;
  removeFilter: (searctText: string) => void;
  onError: (data: ErrorData) => void;
  getOutlets: () => void;
  outletRefresh: () => void;
  loadMoreOutlet: () => void;
}

export interface Port {
  data: datatype;
  CallBacks: callBacks;
}
