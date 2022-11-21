import React, { ReactChild } from "react";

import { FlatList } from "react-native";

const ListItem: any = React.memo(({ children }) => <>{children}</>);

export { ListItem };

export default FlatList;
