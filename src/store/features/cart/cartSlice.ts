import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, ICartItem } from '../../../types';
import { RootState } from '../../store';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const { product, quantity, price } = action.payload;
      const existingItem = state.items.find(item => item.product === product);

      if (existingItem) existingItem.quantity += quantity;
      else state.items.push({ ...action.payload });

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.product === productId);

      if (itemIndex !== -1) {
        const { quantity, price } = state.items[itemIndex];
        state.totalQuantity -= quantity;
        state.totalPrice -= price * quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product === productId);

      if (existingItem && quantity > 0 && existingItem.quantity !== quantity) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCartState = (state: RootState) => state.cart;
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
