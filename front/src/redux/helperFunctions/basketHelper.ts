import {BookBasketType, OrderType} from "../basketReducer";
import { BookType } from "../bookReducer";


export const addItemToBasket = (basket: null | Array<BookBasketType>, payload:BookType) => {
    if (!basket) return [{...payload, quantity: 1}]
    const index = basket.findIndex(i => i.id === payload.id)
    if (index < 0){
        return [...basket, {...payload,quantity: 1}]
    }else{
        const arr = [...basket]
        const currentQuantity = arr[index].quantity + 1
        arr[index].quantity = currentQuantity
        return arr
    }
}
export const subItemFromBusket = (basket: null | Array<BookBasketType>, payload:BookType) => {
    if (!basket) return null
    const index = basket.findIndex(i => i.id === payload.id)
    if (index < 0){
        return [...basket, {...payload,quantity: 1}]
    }else{
        const arr = [...basket]
        const currentQuantity = arr[index].quantity - 1
        if (arr[index].quantity === 1){
            const newArr =  arr.filter(i => i.id !== payload.id)
            if(newArr.length){
                return newArr
            }
            return null
        }
        arr[index].quantity = currentQuantity
        return arr
    }
}
export const orderGeneration = (basket: null | Array<BookBasketType>):null | Array<OrderType> => {
    if (!basket) return null
    return basket.map(i =>  {
        return ({id: i.id, quantity: i.quantity})
    })
}