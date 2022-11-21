export interface DataType {
  favourite: Favourite;
}

export interface Favourite {
  [locationName: string]: LocationFavorite;
}

export interface LocationFavorite {
  [merchant_id: number]: Merchant;
}

export interface Merchant {
  merchantName: string;
  merchantLogo: string;
  attributes: string[];
  locked: boolean;
}

export interface FavouriteClickData {
  merchant_id: number;
  outlet_id: number;
}

export type CallBacks = (data: FavouriteClickData) => void;
