// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reposReducer from '../features/repos/reposSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        repos: reposReducer,
        analytics: analyticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
