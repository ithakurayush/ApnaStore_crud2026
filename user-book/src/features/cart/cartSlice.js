import { createSlice } from "@reduxjs/toolkit"
let cartSlice = createSlice({
    name: 'cart',
    initialState: { products: [] },
    reducers: {
            addProduct: (state, action) => {
                let product = state.products.find((product)=> product.id === action.payload._id)
                if(!product) {
                    state.products.push(action.payload);
                }                
                

            },
            deleteProduct: {}
    }
})
export const { addProduct, deleteProduct } = cartSlice.actions
export default cartSlice.reducer