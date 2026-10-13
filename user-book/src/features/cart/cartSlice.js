import { createSlice } from '@reduxjs/toolkit'
let cartSlice = createSlice({
    name : 'cart',
    initialState : { products : []},
    reducers : {
        addProduct : (state, action ) => {
            state.products.push(action.payload)
        },
        deleteProduct : {},
    }
})

export const { addProduct, deleteProduct } = cartSlice.actions
export default cartSlice.reducers