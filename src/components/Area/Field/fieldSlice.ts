import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import { Area } from '../../../models/area';

export interface FieldState {
    area: Area,
}

const initialState: FieldState = {
    area: new Area(31, 31),
};


// Slice configuration
export const fieldSlice = createSlice({
    name: 'field',
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
export const { turnUp, turnRight, turnDown, turnLeft, tick } = fieldSlice.actions;

// Selectors
export const selectArea = (state: RootState) => state.field.area;

export const selectIsSnakeCell = createSelector(
    selectArea,
    (area: Area) => (position: [number, number]) => area.isSnakeCell(position)
);

export const selectIsFoodCell = createSelector(
    selectArea,
    (area: Area) => (position: [number, number]) => area.isFoodCell(position)
);

export default fieldSlice.reducer;
