import React from "react";

export const DeepLinkContext = React.createContext({
  invokeDeeplink: (host: string, params?: any, url?: {}) => {},
});
