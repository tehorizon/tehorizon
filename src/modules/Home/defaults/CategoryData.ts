import { isRTL } from "@localization";

const CategoryData = {
  FoodAndDrink: {
    display_name: isRTL ? "المطاعم" : "Food & Drink",
    api_name: "Restaurants and Bars",
  },

  BeautyAndFitness: {
    display_name: isRTL ? "تجميل ولياقة بدنية" : "Beauty & Fitness",
    api_name: "Body",
  },

  AttractionsAndLeisure: {
    display_name: isRTL ? "التسلية والترفيه" : "Attractions & Leisure",
    api_name: "Leisure",
  },
  RetailAndServices: {
    api_name: "Retail",
    display_name: isRTL ? "تجارة الازياء" : "Fashion & Retail",
  },
  Travel: {
    display_name: isRTL ? "يسافر" : "Travel",
    api_name: "Travel",
  },
  HotelsWorldwide: {
    display_name: isRTL ? "الفنادق في جميع أنحاء العالم" : "Hotels World wide",
    api_name: "HotelsWorldwide",
  },
  AttractionWorld: {
    display_name: isRTL ? "عالم الجذب" : "Attraction World",
    api_name: "AttractionWorld",
  },
};

export default CategoryData;
