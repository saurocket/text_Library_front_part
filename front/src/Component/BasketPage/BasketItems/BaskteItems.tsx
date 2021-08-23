import {IconButton, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import {useDispatch} from "react-redux";
import {actions, BookBasketType} from "../../../redux/basketReducer";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {BasketSummery} from "./BasketSummery";

type PropsTypes = {
    data: Array<BookBasketType>
}
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    listWrapper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'center',
    },
    leftWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'center',
    },
    leftWrapperDescription: {
        marginLeft: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
    },
    rightWrapperDescription: {
        marginLeft: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
    },

    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    author: {
        fontSize: '1rem',
        overflow: 'hidden',
        color: 'gray',
        fontStyle: 'italic'
    },
    pages: {
        fontSize: '0.8rem',
        color: 'gray',
    },
    price: {
        color: 'orange',
        fontSize: '1rem',
    },
}))

export const BasketItems: React.FC<PropsTypes> = ({data}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const onAddItem = (data: BookBasketType) => {
        dispatch(actions.addItem(data))
    }
    const onSubItem = (data: BookBasketType) => {
        dispatch(actions.subItem(data))
    }

    return (
        <>
            <ul className={classes.root}>
                {data.map(card => <li
                    className={classes.listWrapper}
                    key={card.id}
                >
                    <div className={classes.leftWrapper}>
                        <div>
                            <div>
                                <img src={card.cover_url} alt={card.title} width={100}/>
                            </div>
                            <Typography variant="h6" component='p' className={classes.price}>
                                {card.price} {card.currency === 'PLN' ? 'zł' : card.currency}
                            </Typography>
                        </div>
                        <div className={classes.leftWrapperDescription}>
                            <Typography variant="h6" component='h3' align="center" className={classes.title}>
                                {card.title}
                            </Typography>
                            <Typography variant="h6" component='p' align="center" className={classes.author}>
                                {card.author}
                            </Typography>
                            <Typography variant="h6" component='p' align="center" className={classes.pages}>
                                ilość stron {card.pages}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.rightWrapperDescription}>
                        <div>
                            <IconButton
                                aria-label="sub"
                                onClick={() => onSubItem(card)}
                            >
                                <RemoveCircleOutlineIcon color='primary'/>
                            </IconButton>
                            <span>{card.quantity}</span>
                            <IconButton
                                aria-label="add"
                                onClick={() => onAddItem(card)}

                            >
                                <AddCircleOutlineIcon color='primary'/>
                            </IconButton>
                        </div>

                    </div>


                </li>)}
            </ul>
            <BasketSummery/>
        </>
    )
}


