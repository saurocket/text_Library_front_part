import { useParams } from "react-router-dom"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, getDetails} from "../../redux/bookReducer";
import {statusLoading, uploadDetails} from "../../redux/selectors/mainSelectors";
import {makeStyles, Theme, Typography} from "@material-ui/core";
import {Preloader} from "../assets/Preloader";
import {DetailsItem} from "./DetailsItem/DetailsItem";


const useStyle = makeStyles((theme:Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            marginRight: theme.spacing(4),
        },

    }
}))


export const MoreDetails = () => {
    const classes = useStyle()

    const {id} = useParams<{id: string}>()
     const dispatch = useDispatch()
    const loading = useSelector(statusLoading)
    const details = useSelector(uploadDetails)



    useEffect(()=> {
        dispatch(getDetails(+id))
       return function () {
       dispatch(actions.clearDetails())
       }

    },[id])

    return <section>
        {
            loading ?
                <div className={classes.root}>
                    <Typography variant="h4" component='h2' align="center">
                        Szukamy Książki
                    </Typography>
                    <Preloader/>
                </div>
                :
                details ?
                    <DetailsItem item={details}/>
            :
                    <Typography variant="h4" component='h2' align="center">
                        Coś poszło nie tak
                    </Typography>
            }




    </section>




}