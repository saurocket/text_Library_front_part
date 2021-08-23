import {AppStateType} from "../store";

export const statusLoading = (state:AppStateType) => state.main.isFetch
export const getData = (state:AppStateType) => state.main.data
export const searchStatus = (state:AppStateType) => state.main.queryStatus
export const totalPortionPages = (state:AppStateType) => Math.ceil(state.main.total_records/10)
export const uploadDetails = (state:AppStateType) => state.main.details
export const getOrderId = (state:AppStateType) => state.main.orderID
export const getErrors = (state:AppStateType) => state.main.error