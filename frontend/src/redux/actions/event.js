import axios from "axios";
import {server} from "../../server";
//     create Event
export const createevent = (newForm) => async (dispatch) => {

    try {
        dispatch({
            type: "eventCreateRequest",
        });
        const config = {headers:{"Conten-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
        );
        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });

    } catch (error) {
        dispatch({
            type:  "eventCreateFail",
            payload: error.response.data.message,
        })
    }
};


//        get all Event of a shop

export const getAllEventsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"getAlleventsShopRequest",
        });

        const {data} = await axios.get(`${server}/event/get-all-events/${id}`);
        dispatch({
            type:"getAlleventsShopSuccess",
            payload:data.events,
        })
    } catch (error) {
        dispatch({
            type:  "getAlleventsShopFailed",
            payload: error.response.data.message,
        })
    }
}


//       delete Event of a shop
export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteeventRequest",
        })
        const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,
        {withCredentials:true}
        );
        dispatch({
            type:"deleteeventSuccess",
            payload:data.message,
        });
    } catch (error) {
        dispatch({
            type:  "deleteeventFaild",
            payload: error.response.data.message,
        })
    }
  }


  //  get all events
  export const getAllEvents = () => async (dispatch) => {
    try {
        dispatch({
            type:"getAlleventsRequest",

        });

        const {data}  =await axios.get(`${server}/event/get-all-events`);
        dispatch({
            type:"getAlleventsSuccess",
            payload:data.events,
        })
    } catch (error) {
        dispatch({
            type:  "getAlleventsFailed",
            payload: error.response.data.message,
        })
    }
  }
