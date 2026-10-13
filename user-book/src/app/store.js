import { congigureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
const store = congigureStore({
    reducer : {
        cart : cartReducer
    }
})

export default store