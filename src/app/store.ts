import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import areaReducer from '../components/Area/Field/fieldSlice';

export const store = configureStore({
  reducer: {
    field: areaReducer,
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
