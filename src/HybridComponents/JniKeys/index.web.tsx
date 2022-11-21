import data from "../../../jnikeys.json";

let JniKeys = {
  getKey: (key: string) => data["secure"][key],
};

export default JniKeys;
