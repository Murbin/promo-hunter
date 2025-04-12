import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    category: string;
    store: string;
    proximity: number;
}

const initialState: FiltersState = {
    category: 'all',
    store: 'all',
    proximity: 10,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setStore: (state, action: PayloadAction<string>) => {
            state.store = action.payload;
        },
        setProximity: (state, action: PayloadAction<number>) => {
            state.proximity = action.payload;
        },
        resetFilters: (state) => {
            state.category = initialState.category;
            state.store = initialState.store;
            state.proximity = initialState.proximity;
        },
    },
});

export const { setCategory, setStore, setProximity, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer; 