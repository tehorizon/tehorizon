const logoImage = require("./design/images/companyHeader.png");
const secondryLogo = require("./design/images/second_logo.png");

const introImages = [
  require("./design/images/Intro_01.png"),
  require("./design/images/Intro_02.png"),
  require("./design/images/Intro_03.png"),
];
export { logoImage, secondryLogo, introImages };
export { default as design } from "./design/DesignSystem/design.json";
export * from "./design/fonts";
export * from "./design/Animations";
