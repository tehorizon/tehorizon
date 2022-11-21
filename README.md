# Fast track Template

## Installation

```bash
git clone https://github.com/theentertainerme/react-native-fast-track.git
```

## Stable Branches

- B2B

Use Yarn package manager for managing dependencies.

## Add dependecies

```bash
yarn install
```

then:

```bash
npx pod-install
```

## Running

**iOS**

```
yarn iOS
```

**Andoid**

```
yarn  android
```

**Progressive Web App**

```
PORT=8080 yarn pwa
```

## Purpose:

This template is used to generate multiple white labels application using it. This template support's

- iOS
- Android
- PWA

so while developing the code keep it mind all of them. [For more](#keep-in-mind)

## Project overview:

Project is divided into modules such as Auth Module, Home Module etc. Each module is declared as a stack in `react-navigation`.
On any screen you don't want `Bottom Tabbar` put that screen in `MainNavigation()` in `navigation.tsx`. All the sagas and reducers of diffrent modules should be combine in main `saga` & `root-reducer`

### Paths:

- Naviagtion: src/navigation.tsx
- Reducer: src/redux/root-reducer
- Saga: src/redux/sagas
- Store: src/redux/store
- Alias: babel.config.js
- Webpack configuarations: webpack.config.js
- Common components: src/components
- Hybrid Components: src/HybridComponents
- Assets: src/assets
- Network call: src/network
- Localization: src/utils/localization
- Analytics: src/utils/horizon-analytics
- Colors: libraries/rn_fast_track_uilib/build/design/DesignSystem/design.json
- Animations: libraries/rn_fast_track_uilib/build/design/Animations
- Fonts: libraries/rn_fast_track_uilib/build/design/fonts
- Common Style: src/utils/genericStyles.tsx
- Module configuation: src/Module.json & src/Modules.json
- Detox configuration: .detoxrc.js

### State Management:

`redux` is used for managing application state, with `redux-saga` as middleware for managing side-effects. Each module has its own reducer and redux-saga watchers. `appReducer` is used to handle common data and actions. `root-reducer` composed all the other reducers. If you want to persist any reducer just made it `whitelist`.

### Typescript:

Every module has it own `interfaces` for screens and responses you can use - [JSON2TS](http://json2ts.com/) to get types from json data.
We have `useAppSelector` over `useSelector` which support typescript: like it will predict the nested values of state so that you can avoid logical error.

### Alias:

Whenever you are going to add any alias add them in below files

- babel.config.js (used by RN)
- tsconfig.json (used by TS)
- webpack.config.js (used by Webpack)

## Environments:

Tempalate support total 6 environments

1. DEV
2. QA
3. UAT
4. RC
5. BLUE
6. LIVE

All the env files are at root. `.env` is current active environment.
We seprate `AppConfig` file for respective env.
Active env file is `AppConfig`. You can find AppConfig file under `src/`.

## Hybrid Components

Hybrid component is used for such libraries which dont support webpack so we create a Hybrid component in which index file has export for Native (Mobile) and index.web has export for webpack (PWA).

## How to add new modules

Every modules has its own redux files, screens, interfaces, e2e, BL and navigation.

After creating all these files

- Add module name in Module.json
- Add module configuration in Modules.json

If Module is not compulsory (can be disable)

- Add check in root-reducer for module reducer.
- Add check in sagas for module saga.
- Add navigation check for module navigation.
- Add e2e check in e2e/index.e2e.ts

## Unit testing

We are using [Detox](https://wix.github.io/Detox/docs/introduction/getting-started) with [JEST](https://jestjs.io/) to write `e2e` test cases.

Each module has its own `e2e` folder which contains tests. And all the module's e2e files are combine in `e2e/index.e2e.ts`.

Run the following commands to run on specific environment.

**iOS**

- Debug

to Build

```
yarn iosDebugBuild
```

to Run

```
yarn iosDebugTest
```

- Release

to Build

```
yarn iosReleaseBuild
```

to Run

```
yarn iosReleaseTest
```

**Android**

to Build

```
yarn androidDebugBuild
```

to Run

```
yarn androidDebugTest
```

- Release

to Build

```
yarn androidReleaseBuild
```

to Run

```
yarn androidReleaseTest
```

# Keep In Mind

Please make sure to follow coding conventions:

- To add margin, marginVertical, marginHorizontal ,padding, paddingVertical, paddingHorizontal, borderWidth, borderColor import it from @utils/genericStyle.
- To add any theme colors,radius import it from rn_fast_track_uilib.
- To add any font Family import it from @fonts.
- If you add any new library which support by webpack just add it to `compileNodeModules` in `webpack.config.js`
- Always add checks for plug & play modules in navigation, reducer & sagas.
- Always add text using i18n from @localization.
- Always add text in Arabic & English. (get Arabic from [google translation](https://www.google.com/search?q=english+to+arabic&rlz=1C5CHFA_enPK943PK943&oq=engli&aqs=chrome.0.69i59j69i57j69i59l2j0i512j0i433i512j0i131i433i512l4.1113j0j4&sourceid=chrome&ie=UTF-8))
- Always add testID to each UI tag.
- Create a new branch for new module/functionality.
- Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format code.
- Use Function components instead of class components.
- If you find anything wrong with code discuss it with your technical lead.

---

NOTE:
If you do find something that could be improved, please update the readme file and generate a pull request.

---
