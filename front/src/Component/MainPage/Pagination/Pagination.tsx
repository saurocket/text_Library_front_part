import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Pagination as PaginationBasic} from '@material-ui/lab';
import {useDispatch} from "react-redux";
import {actions} from "../../../redux/bookReducer";

type PropsType = {
    count: number
}


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                marginTop: theme.spacing(4),
            },
        },
    }),
);

export const Pagination:React.FC<PropsType> = ({count}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const changePage = (e:any) => {
        dispatch(actions.updateQueryStatus({page: +e.target.textContent}))
    }
    return (
        <div className={classes.root}>
            <PaginationBasic count={count} color="primary"  onClick={(e)=> changePage(e)}/>
        </div>
    );
}