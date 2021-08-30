import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ScoreState {
    score: number,
}

const initialState: ScoreState = {
    score: 0,
};

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        addScore: (state: ScoreState, action: PayloadAction<number>) => {
            state.score += action.payload;
        },
        resetScore: state => {
            state.score = 0;
        },
    }
});

export const { addScore, resetScore } = scoreSlice.actions;

export const selectScore = (state: RootState) => state.score.score;

export default scoreSlice.reducer;
