import {BooksAPI, SummeryOrderType} from '../API/api'
import {InferActionsTypes, BaseThunkType} from './store'


export type BookType = {
    "id": number
    "title": string,
    "author": string,
    "cover_url": string,
    "pages": number
    "price": number,
    "currency": string
}
type InitialStateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionTypes>
type QueryPayloadType = {
    page?: number,
    title?: string,
    author?: string,
}

const initialState = {
    isFetch: false,
    data: [] as [] | Array<BookType>,
    error: null as null | string,
    total_records: 0,
    queryStatus: {
        page: 1,
        title: '',
        author: '',
    },
    details: null as null | BookType,
    orderID: null as null | number
}

export const bookReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FETCHING":
            return {...state, isFetch: action.value}
        case "UPLOAD_DATA": {
            return {
                ...state,
                data: action.payload.data,
                total_records: action.payload.metadata.total_records,
            }
        }
        case "THROW_ERROR":
            return {...state, error: action.payload}
        case "CLEAR_ERROR":
            return {...state, error: null}
        case "UPDATE_QUERY_STATUS":
            return {...state, queryStatus: {...state.queryStatus, ...action.payload}}
        case "UPLOAD_DETAILS":
            return {...state, details: action.payload}
        case "CLEAR_DETAILS":
            return {...state, details: null}
        case "UPLOAD_ID_NUMBER": {
            return {...state, orderID: action.id}
        }
        default:
            return state
    }
}
export const actions = {
    isFetch(value: boolean) {
        return ({type: 'TOGGLE_FETCHING', value} as const)
    },
    uploadData(payload: any) {
        return ({type: 'UPLOAD_DATA', payload} as const)
    },
    clearData() {
        return ({type: 'CLEAR_DATA'} as const)
    },
    throwError(payload: string) {
        return ({type: 'THROW_ERROR', payload} as const)
    },
    clearError() {
        return ({type: 'CLEAR_ERROR'} as const)
    },
    updateQueryStatus(payload: QueryPayloadType) {
        return ({type: 'UPDATE_QUERY_STATUS', payload} as const)
    },
    uploadDetails(payload: any) {
        return ({type: 'UPLOAD_DETAILS', payload}) as const
    },
    clearDetails() {
        return ({type: 'CLEAR_DETAILS'}) as const
    },
    uploadOrderId(id:number | null){
        return({type: 'UPLOAD_ID_NUMBER',id} as const)
    }
}

export const getBooks = (): ThunkType => {
    return (
        async (dispatch, getState) => {
            dispatch(actions.isFetch(true))
            const {author, page, title} = getState().main.queryStatus
            try {
                const response = await BooksAPI.getBooks(page, title, author)
                if (response.status = 200) {
                    dispatch(actions.uploadData(response))
                } else {
                    dispatch(actions.throwError('coś poszło nie tak'))
                    throw new Error('coś poszło nie tak')
                }
            } catch (e) {
                dispatch(actions.throwError(e.message || 'coś poszło nie tak'))
                throw e
            } finally {
                dispatch(actions.isFetch(false))
                if (getState().main.error) {
                    dispatch(actions.clearError())
                }
            }
        }
    )
}


export const getDetails = (id: number): ThunkType => {
    return (
        async (dispatch, getState) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await BooksAPI.getDetails(id)
                if (response.status = 200) {
                    dispatch(actions.uploadDetails(response.data))
                } else {
                    dispatch(actions.throwError('coś poszło nie tak'))
                    throw new Error('coś poszło nie tak')
                }
            } catch (e) {
                dispatch(actions.throwError(e.message || 'coś poszło nie tak'))
                throw e
            } finally {
                dispatch(actions.isFetch(false))
                if (getState().main.error) {
                    dispatch(actions.clearError())
                }
            }
        }
    )
}
export const postOrder = (data:SummeryOrderType):ThunkType => {
    return (
        async (dispatch,getState) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await BooksAPI.sendForm(data)
                if (response.status = 201) {
                  const id = await response.data.id
                    dispatch(actions.uploadOrderId(id))
                } else {
                    dispatch(actions.throwError('coś poszło nie tak'))
                    throw new Error('coś poszło nie tak')
                }
            } catch (e) {
                dispatch(actions.throwError(e.message || 'coś poszło nie tak'))
                throw e
            } finally {
                dispatch(actions.isFetch(false))
                if (getState().main.error) {
                    dispatch(actions.clearError())
                }
                if(getState().main.orderID){
                    dispatch(actions.uploadOrderId(null))
                }
            }
        }
    )
}
