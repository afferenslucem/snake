import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface GameState {
    started: boolean,
    speed: number,
    gameOver: string,
}

const initialState: GameState = {
    started: false,
    speed: null,
    gameOver: null,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,

    reducers: {
        startGame: (state) => {
            state.started = true;
            state.speed = 1;
            state.gameOver = null;
        },
        changeSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },
        endGame: (state, action: PayloadAction<string>) => {
            state.started = false;
            state.speed = null;
            state.gameOver = action.payload;
        },
    },
});

// Actions block
export const { startGame, changeSpeed, endGame } = gameSlice.actions;

export const selectGameStarted = (state: RootState) => state.game.started;

export const selectGameOvered = (state: RootState) => state.game.gameOver;

export const selectSpeed = (state: RootState) => state.game.speed;

export default gameSlice.reducer;
