import {configureStore } from '@reduxjs/toolkit';
import banksReducer from './banksReducer';
export default configureStore({
    reducer: {
        banks: banksReducer,
    },
  })