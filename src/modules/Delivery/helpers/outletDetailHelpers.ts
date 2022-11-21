const fetchTabsFromData = (data) => {
  try {
    if (data) {
      const menuTabs = data.map((menuItem) => {
        return {
          testID: menuItem.menuId,
          title: menuItem.menuName,
          key: menuItem.menuId,
          payload: menuItem,
        };
      });

      return menuTabs;
    }
  } catch (error) {
    console.log("error in fetchTabsFromData :", error);
  }
};

const fetchMenuProductsList = (activeIndex, data) => {
  try {
    if (data) {
      return data.filter((item, index) => {
        if (index === activeIndex) {
          return item;
        }
      });
    }
  } catch (error) {
    console.log("error in fetchMenuProductsList:", error);
  }
};

export { fetchTabsFromData, fetchMenuProductsList };
