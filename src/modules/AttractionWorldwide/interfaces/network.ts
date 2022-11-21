export interface RequestObjectDataType {
  path: string;
  method: string;
  headers?: HeaderDataType;
  postData?: Object | string;
  queryParams?: Object;
}

interface HeaderDataType {
  Authorization?: string;
}

