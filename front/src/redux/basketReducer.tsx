import { BookType } from "./bookReducer";
import {addItemToBasket, orderGeneration, subItemFromBusket} from "./helperFunctions/basketHelper";
import {InferActionsTypes} from "./store";


export type BookBasketType = {
    "id": number
    "title": string,
    "author": string,
    "cover_url": string,
    "pages": number
    "price": number,
    "currency": string,
    "quantity": number
}
export type FormType = {
    first_name: string,
    last_name: string,
    city: string,
    zip_code: string
}
export type OrderType = {
    id: number,
    quantity: number
}
type InitialStateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>

const initialState = {
    basket: null as null | Array<BookBasketType>,
    totalPrice: 0,
    totalBooks: 0,
    form: {
        first_name: '',
        last_name: '',
        city: '',
        zip_code: ''
    } as FormType,
    order: null as null| Array<OrderType>
}


export const basketReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_ITEM_TO_BASKET":
            return {...state,basket:addItemToBasket(state.basket, action.payload)}
        case "SUB_ITEM_FROM_BASKET":
            return  {...state,basket: subItemFromBusket(state.basket, action.payload)}
        case "SEND_FORM_TO_REDUX":
            return {...state,form: {...state.form, ...action.payload}}
        case "ORDER_GENERATION":
            return {...state,order: orderGeneration(action.payload)}
        case "CLEAR_ORDER":
            return {...state, order: null}
        case "CLEAR_BASKET":
        return {...state, basket: null}

        default:
            return state
    }
}

export const actions = {
    addItem(payload:BookType ) {
        return ({type: 'ADD_ITEM_TO_BASKET', payload} as const)
    },
    subItem(payload:BookType) {
        return ({type: 'SUB_ITEM_FROM_BASKET', payload} as const )
    },
    sendForm(payload:FormType){
        return({type: 'SEND_FORM_TO_REDUX', payload} as const)
    },
    orderGeneration(payload:Array<BookBasketType>){
        return ({type: 'ORDER_GENERATION', payload} as const)
    },
    clearOrder(){
        return({type: 'CLEAR_ORDER'} as const)
    },
    clearBasket(){
        return({type: 'CLEAR_BASKET'} as const)
    }

}