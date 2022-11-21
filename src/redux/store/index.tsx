import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "../root-reducer";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
import { createLogger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  /* preloadedState, */ applyMiddleware(sagaMiddleware, createLogger())
);

export const persistor = persistStore(store);

export default { store, persistor };

sagaMiddleware.run(rootSaga); // start saga middleware
export type RootState = ReturnType<typeof store.getState>; // type of root reducer
