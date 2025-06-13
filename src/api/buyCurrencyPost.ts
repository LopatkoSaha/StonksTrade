import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

export const buyCurrencyPost = async (dispatch: Dispatch, saleName: string, buyName: string, quantity: number) => {
    try {
        const response = await axios.post('http://localhost:3600/wallet/buyCurrency', {saleName, buyName, quantity}, { withCredentials: true });
        return response.data;
    }
    catch(error: any) {
        return "Ошибка запроса buyCurrencyPost";
    }
}