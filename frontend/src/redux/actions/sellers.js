


//    get all  sellers -- Admin

import axios from "axios"
import { server } from "../../server"

 export const getAllSellers = () => async (dispatch) => {
    try {
         dispatch({
            type: "getAllSellersRequest",
         })

         const {data} = await axios.get(`${server}/shop/admin-all-sellers`, {
            withCredentials: true,
         }) ;
         dispatch ({
            type: "getAllSellersSuccess",
           payload:data.sellers,
         })
    } catch (error) {
        dispatch({
            type: "getAllSellersFailed",
            payload: error.response.data.message,
        })
    }
 }