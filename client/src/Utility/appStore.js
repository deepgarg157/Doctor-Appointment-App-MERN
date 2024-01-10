import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice"
import userReducer from './userSlice'

const appStore = configureStore({
      reducer :{
       alert : alertReducer,
       user : userReducer
      }
    });

export default appStore;