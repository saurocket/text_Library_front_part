import {AppStateType} from "../store";
import { createSelector } from 'reselect';

export const getBasketItems = (state:AppStateType) => state.basket.basket
export const getTotalPrice = createSelector(
    [getBasketItems], (basket) => {
        if (!basket || basket.length=== 0) return 0
        return basket.reduce((acc, value) => acc + (value.price*value.quantity), 0);
    }
)

export const getTotalItems = createSelector(
    [getBasketItems], (basket) => {
        if (!basket || basket.length=== 0) return 0
        return basket.reduce((acc, value) => acc + value.quantity, 0);
    }
)
export const getFinalForm = (state:AppStateType) => state.basket.form
export const getOrder = (state:AppStateType) => state.basket.order
