import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';



export const buyAllInPost = async (dispatch: Dispatch, saleName: string, buyName: string) => {
    try {
        const response = await axios.post('http://localhost:3600/wallet/buyAllIn', {saleName, buyName}, { withCredentials: true });
        return response.data
    }
    catch(error: any) {
        return "Ошибка запроса buyAllInPost";
    }
}