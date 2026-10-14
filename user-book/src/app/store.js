import { configureStore } from "@reduxjs/toolkit";
import cardReducer from '../features/cart/cartSlice'
const store = configureStore({
    reducer: {
        cart: cardReducer
    }
})
export default store