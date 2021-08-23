import React from "react";
import {BookType} from "../../../redux/bookReducer";


import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import {Button, IconButton} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {actions} from "../../../redux/basketReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    item: BookType
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            marginTop: theme.spacing(6),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        root: {
            width: '50%',
            backgroundColor: theme.palette.background.paper,
        },
        imageWrapper: {
            height: '30%',
            overflow: 'hidden',

        },
        title: {
            fontSize: '1.4rem',
            overflow: 'hidden',
        },
        author: {
            fontSize: '1.2rem',
            overflow: 'hidden',
        },
        pages: {
            fontSize: '1rem',
        },
        price: {
            color: 'orange',
            fontSize: '1.2rem',
        },
        buttonsWrapper:{
            display: 'flex',
            justifyContent: 'space-between',
        }
    }),
);


export const DetailsItem: React.FC<PropsType> = ({item}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const onBack = () => {
        history.push('/')
    }
    const onAddItemToBasket = (card:BookType) => {
        dispatch(actions.addItem(card))
    }

    return <div className={classes.wrapper}>
        <div className={classes.imageWrapper}>
            <img src={item.cover_url} alt={item.title} width='100%'/>
        </div>
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <Typography variant="h6" component='h3' align="center" className={classes.title}>
                    {item.title}
                </Typography>
            </ListItem>
            <hr/>
            <ListItem alignItems="flex-start">
                <Typography variant="h6" component='p' align="center" className={classes.author}>
                    <b>Autor</b> <i>{item.author}</i>
                </Typography>
            </ListItem>
            <hr/>
            <ListItem alignItems="flex-start">
                <Typography variant="h6" component='p' align="center" className={classes.pages}>
                    <b>Liczba stron</b> {item.pages}
                </Typography>
            </ListItem>
            <hr/>
            <ListItem alignItems="flex-start">
                <Typography variant="h6" component='p' align="center" className={classes.price}>
                    {item.price} {item.currency === 'PLN' ? 'zł' : item.currency}
                </Typography>
            </ListItem>
            <hr/>
            <ListItem alignItems="flex-start" className={classes.buttonsWrapper}>
                <IconButton
                    onClick={()=> onAddItemToBasket(item)}
                    color="primary"
                    aria-label="add to shopping cart"

                >
                    <AddShoppingCartIcon />
                </IconButton>

                <Button
                    onClick={onBack}
                    variant='contained'
                    size='small'
                    color='primary'
                >
                    powrót
                </Button>
            </ListItem>

        </List>
    </div>
}