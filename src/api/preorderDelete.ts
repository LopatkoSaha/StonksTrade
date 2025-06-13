import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

export const preorderDelete = async (dispatch: Dispatch, id: number) => {
    try {
        const response = await axios.delete('http://localhost:3600/preorders/delete', { 
            withCredentials: true,
            data: { id }
        })
        return response.data;
    } catch (error: any) {
        console.error(error);
        return "Ошибка запроса preorderDelete";
    }
}