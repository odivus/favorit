import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: '', // артикул, по которому выполнен поиск (этап 1)
  selectedBrand: null, // { id, brand, number, name } — выбранный производитель (этап 2)
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    numberSubmitted(state, action) {
      state.number = action.payload;
      state.selectedBrand = null;
    },
    brandSelected(state, action) {
      state.selectedBrand = action.payload;
    },
  },
});

export const { numberSubmitted, brandSelected } = searchSlice.actions;
export default searchSlice.reducer;
