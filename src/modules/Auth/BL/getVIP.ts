// import ValidateVipKey from "./ValidateVipKey";
// import { store } from "@redux/store";
// import { setDeeplinkData } from "@redux/appReducer/app.actions";

// export const getVIPKey = async () => {
//   const state = store.getState();
//   const vipKey = await deeplinkHandler(state.appReducer.deeplinkData);
//   return vipKey;
// };

// export const deeplinkHandler = async (deeplink) => {
//   try {
//     if (deeplink) {
//       const type = deeplink.type;
//       if (type === "vipKey") {
//         const isDone = deeplink.isDone;
//         if (!isDone) {
//           store.dispatch(setDeeplinkData({ isDone: true }));
//           const isLoggedIn = deeplink.data.isLoggedIn;
//           const vipKey = deeplink.data.vipKey;
//           const token = deeplink.data.token;
//           // const sessionToken = deeplink.data.sessionToken;
//           if (isLoggedIn) {
//             try {
//               //on success profile update call  TODO:
//               const validateResponse = await ValidateVipKey(token, vipKey);
//               if (!validateResponse.data.validation_status) {
//                 // await Updates.reloadAsync()
//               }
//             } catch (error) {
//               console.log(error.message);
//             }
//           } else {
//             return vipKey;
//           }
//         }
//       }
//     } else {
//     }
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// };
