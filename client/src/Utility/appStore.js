import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice"

const appStore = configureStore({
      reducer :{
       alert : alertReducer
      }
    });

export default appStore;