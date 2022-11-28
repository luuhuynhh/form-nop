import { configureStore } from '@reduxjs/toolkit'
import { arrSinhVienFilter } from '../reducers/arrSinhVienFilterReducer'
import { arrSinhVien } from '../reducers/formValueReducer'
import { suaSinhVienMaSV } from '../reducers/suaSinhVienMaSVReducer'

export const store = configureStore({
    reducer: {
        //Nơi chứa state ứng dụng
        arrSinhVien: arrSinhVien,
        arrSinhVienFilter: arrSinhVienFilter,
        suaSinhVienMaSV: suaSinhVienMaSV
    },
})