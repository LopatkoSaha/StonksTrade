import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "store/messageSlice";
import { setUser } from "store/userSlice";

export const userGet = async (dispatch: Dispatch) => {
    await axios.get('http://localhost:3600/user/get', { withCredentials: true })
    .then(response => {  
        dispatch(setUser(response.data));   
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.errName}));
    });
}