import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import { Area } from '../../../models/area';

export interface AreaState {
    area: Area,
}

const initialState: AreaState = {
    area: new Area(31, 31),
};


// Slice configuration
export const areaSlice = createSlice({
    name: 'area',
    initialState,

    reducers: {
        turnUp: (state) => {
            state.area = state.area.turnUp();
        },
        turnRight: (state) => {
            state.area = state.area.turnRight();
        },
        turnDown: (state) => {
            state.area = state.area.turnDown();
        },
        turnLeft: (state) => {
            state.area = state.area.turnLeft();
        },
        tick: (state) => {
            state.area = state.area.tick();
        },
    },
});

// Actions block
export const { turnUp, turnRight, turnDown, turnLeft, tick } = areaSlice.actions;

// Selectors
export const selectIsSnakeCell = (state: RootState, index: [number, number]) => state.area.area.isSnakeCell(index);
export const selectIsFoodCell = (state: RootState, index: [number, number]) => state.area.area.isFoodCell(index);

export default areaSlice.reducer;
