import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try{
        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                image: data.product.images[0].url,
                price: data.product.price,
                stock: data.product.stock,
                quantity
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(error){
        console.log(error);
    }
}

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(error){
        console.log(error);
    }
}

export const saveShippingInfo = (data) => async (dispatch) => {
    try{
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data
        })

        localStorage.setItem('shippingInfo', JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}