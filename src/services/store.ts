import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients';
import modalReducer from './slices/modal';
import feedReducer from './slices/feed';
import authReducer from './slices/auth';
import ordersReducer from './slices/orders';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  ingredients: ingredientsReducer,
  modals: modalReducer,
  feed: feedReducer,
  auth: authReducer,
  orders: ordersReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
