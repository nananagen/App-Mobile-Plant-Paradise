import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addOrRemoveFromFavorites: (state, action) => {
      const productToAddOrRemove = action.payload;
      
      const isProductInFavorites = state.items.some(
        (product) => product.id === productToAddOrRemove.id
      );

      if (isProductInFavorites) {
        state.items = state.items.filter(
          (product) => product.id !== productToAddOrRemove.id
        );
        alert("Removido!")
      } else {
        state.items.push(productToAddOrRemove);
        alert("Adicionado!")
      }
    },
  },
});

export const { addOrRemoveFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
