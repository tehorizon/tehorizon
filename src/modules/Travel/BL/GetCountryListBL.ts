import { countryListApi } from "./apis";
import { locationDataType } from "./Interfaces";
import allFlags from "@Home/defaults/flag";

const getCountryList = async (postData: any) => {
  try {
    const countryListResult = await countryListApi(postData);

    let countryList: Array<locationDataType> = [];

    if (countryListResult) {
      const groupByCategory = countryListResult?.data?.countries?.reduce(
        (group, element) => {
          const { region } = element;
          group[region] = group[region] ?? [];
          group[region].push(element);
          return group;
        },
        {}
      );

      let keys = Object.keys(groupByCategory);

      for (let i = 0; i < keys.length; i++) {
        countryList.push({
          title: keys[i],
          data: groupByCategory[keys[i]],
        });
      }
    }

    return countryList;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getCountryList;
