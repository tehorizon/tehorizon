export interface RequestObjectDataType {
  path: string;
  method: string;
  headers?: HeaderDataType;
  postData?: Object | string;
  queryParams?: Object;
  noCache?: boolean;
  isEncrypted?: boolean;
}

interface HeaderDataType {
  Authorization?: string;
}

export interface OutletData {}
