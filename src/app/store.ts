import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import areaReducer from '../components/Area/Field/areaSlice';

export const store = configureStore({
  reducer: {
    area: areaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
