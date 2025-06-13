import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { setPreorderStore } from "store/preorderSlice";

export const preordersGet = async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            'http://localhost:3600/preorders/get',
            { withCredentials: true }
        )
        dispatch(setPreorderStore(response.data));  
    } catch (error: any) {
        console.error(error);
        return "Ошибка запроса preorderSet";
    }
}