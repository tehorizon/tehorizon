#! /usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const walkSync = require("walk-sync");

const getLibrariesPackageJsonPath = () => {
  try {
    const paths = walkSync("src", {
      globs: ["modules/**/libraries/**/**/package.json"],
    });
    return paths;
  } catch (error) {
    return [];
  }
};

const makePackageJsonPatch = () => {
  try {
    const allPacakgeJsonPaths = getLibrariesPackageJsonPath();
    allPacakgeJsonPaths.map((allPacakgeJsonPaths) => {
      const packageJsonPath = path.join("src", allPacakgeJsonPaths);
      const packagejsonFileRead = fs.readFileSync(packageJsonPath, "utf8");
      let packagejsonFileJSON = JSON.parse(packagejsonFileRead);
      packagejsonFileJSON.name = undefined;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packagejsonFileJSON, null, 4)
      );
    });
  } catch (error) {}
};

makePackageJsonPatch();

//
// const makeIndexFileForAllImages=()=>{
//   try {
//     const paths = walkSync("src/modules/ft_rn_home_module/src/screens/ft_rn_home_expo/screen/images/flags/", {
//       globs: ["*.png"],
//     });
//     let fileContent="const flags={";
//     paths.map(pathItem=>{
//       const flagName=pathItem.replace("@2x","").replace(".png","");
//       fileContent+=`
//         ${flagName}:require("../images/flags/${flagName}.png"),
//       `
//     })
//     fileContent+="}";
//     fileContent+=`

//     export default flags;`;
//     fs.writeFileSync("/Users/nomanismaeel/Documents/storytesting/FastTractRN/independentScreens/template/ft_rn_template/src/modules/ft_rn_home_module/src/screens/ft_rn_home_expo/screen/defaults/flag.js",fileContent)
//     // return paths;
//   } catch (error) {
//     return [];
//   }
// }

// makeIndexFileForAllImages();

// const makePatchForI18n = () => {
//   try {
//     const paths = walkSync("./", {
//       globs: ["**/I18n.js"],
//     });
//     paths.forEach(item=>{
//       const I18nPath = path.join("./", item);
//       const main118nPath="/Users/nomanismaeel/Documents/storytesting/FastTractRN/independentScreens/template/I18n.js";
//       fs.copySync(main118nPath, I18nPath)
//     })
//   } catch (error) {}
// };

// makePatchForI18n();

// const getCommonJsonPathPath = (lng) => {
//   try {
//     const paths = walkSync("src", {
//       globs: [`**/**/**/locales/${lng}/**/**.json`],
//     });
//     return paths;
//   } catch (error) {
//     return [];
//   }
// };

// const makei18nfileintosinglefile=async ()=>{
//   let englishLanggeJson={};
//   let arabicLanggeJson={};
//   const allCommonJsonPathEng=getCommonJsonPathPath("en");
//   const allCommonJsonPathAr=getCommonJsonPathPath("ar");
//   allCommonJsonPathEng.map((commonJsonFileItem) => {
//     const commonJsonPath = path.join("src", commonJsonFileItem);
//     const commonjsonFileRead = fs.readJsonSync(commonJsonPath, "utf8");
//     Object.assign(englishLanggeJson,{...commonjsonFileRead});
//   });
//   allCommonJsonPathAr.map((commonJsonFileItem) => {
//     const commonJsonPath = path.join("src", commonJsonFileItem);
//     const commonjsonFileRead = fs.readJsonSync(commonJsonPath, "utf8");
//     Object.assign(arabicLanggeJson,{...commonjsonFileRead});
//   });
//   fs.writeFileSync("/Users/nomanismaeel/Desktop/builds/trans/en/common.json", JSON.stringify(englishLanggeJson,null,4))
//   fs.writeFileSync("/Users/nomanismaeel/Desktop/builds/trans/ar/common.json", JSON.stringify(arabicLanggeJson,null,4))
// }

// makei18nfileintosinglefile();
