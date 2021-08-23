import React, {useEffect} from "react";
import {Grid} from "@material-ui/core/";
import {SearchFormFilter} from "./SearchFromFilter/SearchFormFilter";
import {useDispatch, useSelector} from "react-redux";
import { getBooks } from "../../redux/bookReducer";
import {getData, searchStatus, totalPortionPages} from "../../redux/selectors/mainSelectors";
import {CardsItem} from "./CardItem/CardItem";
import {Pagination} from "./Pagination/Pagination";



export const MainPage:React.FC = () => {
    const dispatch = useDispatch()
    const data =  useSelector(getData)
    const {page,title,author} = useSelector(searchStatus)
    const getPortionsPages = useSelector(totalPortionPages)


    useEffect(() => {
        dispatch(getBooks())
    },[page,title,author,dispatch])


    return (
            <section>
            <Grid  container spacing={2}>
                <SearchFormFilter
                authorR={author}
                titleR={title}
                />
                {data.length>0 ?
                    <CardsItem data={data}/>
                    :<h2>Nic nie znalezione</h2>
                }
            </Grid>
                {getPortionsPages > 1 && <Pagination count={getPortionsPages}/>}
        </section>
    )
}
