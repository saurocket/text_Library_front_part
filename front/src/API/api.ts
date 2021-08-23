import axios from "axios";
import {createPath} from "./helperAPI";
import {OrderType} from "../redux/basketReducer";



export type SummeryOrderType = {
    order: Array<OrderType>
    first_name: string,
    last_name: string,
    city: string,
    zip_code: string
}


const instance = axios.create({
    baseURL: 'http://localhost:3001/api/',
})

export const BooksAPI = {
    getBooks(page: number, title:string, author: string){
    const params = createPath(page,title,author)
        return instance.get(`book?${params}`).then(r => r.data)
    },
    getDetails(id:number){
        return instance.get(`book/${id}`).then(r => r.data)
    },
    sendForm(data:SummeryOrderType){
        return axios({
            method: 'post',
            url: 'http://localhost:3001/api/order',
            data: data
        }).then(r => r.data)
    }


}

// instance.post(`order/${data}`).then((r=> r.data))