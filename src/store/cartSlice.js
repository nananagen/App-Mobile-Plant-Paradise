import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      
      const isProductInCart = state.items.find(
        (product) => product.id === item.id
      );

      if (isProductInCart) {
        isProductInCart.quantity +=1;
        alert("Produto adicionado");
        // return;
      } else {
        // state.items.push(item);
        state.items.push({ ...item, quantity: 1 });
        alert("Adicionado ao carrinho!")
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    increment:(state, action)=>{
      const item = action.payload
      const isProductInCart = state.items.find(
        (product) => product.id === item.id
      );
      isProductInCart.quantity+=1;
    },
    decrement:(state, action)=>{
      const item = action.payload
      const isProductInCart = state.items.find(
        (product) => product.id === item.id
      );
      if(isProductInCart.quantity === 1){
        state.items = state.items.filter((item) => item.id !== isProductInCart.id); 
        return;
      }
      isProductInCart.quantity-=1;

    },
  },
});

export const { addItem, clearCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
