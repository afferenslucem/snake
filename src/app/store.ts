import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import areaReducer from '../components/Area/Field/field-slice';
import gameReducer from '../components/Area/Field/game-slice';
import scoreReducer from '../components/Score/score-slice';

export const store = configureStore({
  reducer: {
    field: areaReducer,
    game: gameReducer,
    score: scoreReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
