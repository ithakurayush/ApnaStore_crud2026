import { createSlice } from '@reduxjs/toolkit'
let cartSlice = createSlice({
    name : 'cart',
    initialState : { products : []},
    reducers : {
        addProduct : {},
        deleteProduct : {},
    }
})

export const { addProduct, deleteProduct } = cartSlice.actions
export default cartSlice.reducers