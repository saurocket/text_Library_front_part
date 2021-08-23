import {Card, CardContent, CardMedia, IconButton, makeStyles, Typography} from "@material-ui/core";
import React, {useCallback} from "react";
import {useHistory} from "react-router-dom";
import {BookType} from "../../../redux/bookReducer";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {useDispatch} from "react-redux";
import {actions} from "../../../redux/basketReducer";

type PropsTypes = {
    data: Array<BookType>
}
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'grid',
        gridColumnGap: theme.spacing(1),
        gridRowGap: theme.spacing(2),
        gridTemplateColumns: 'repeat(5, 1fr);',
    },
    card: {
        position: 'relative',
        animation: 'showImage 1s forwards ',
        height: '26rem'
    },
    cardMedia: {
        paddingTop: "140%",
        cursor: 'pointer'
    },
    cardContent: {
        paddingTop: theme.spacing(0),
        paddingLeft: '0',
        paddingRight: '0',
        flexGrow: 1,
    },
    title: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    author: {
        fontSize: '0.7rem',
        overflow: 'hidden',
        color: 'gray',
        fontStyle: 'italic'
    },
    topDescription: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 0.5rem'
    },
    pages: {
        fontSize: '0.6rem',
        color: 'gray',
    },
    price: {
        color: 'orange',
        fontSize: '1rem',
    },
    addBasket:{
        position: 'absolute',
        bottom: '0',
        left: '35%',
    }

}))

export const CardsItem: React.FC<PropsTypes> = ({data}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClick = useCallback((id: number) => {
      history.push(`/details/${id}`)
    }, [data])
    const onAddItemToBasket = (card:BookType) => {
        dispatch(actions.addItem(card))
    }

    return (
        <div className={classes.root}>
            {data.map(card => <div
                key={card.id}
            >
                <Card
                    className={classes.card}
                >
                    <div onClick={()=> handleClick(card.id)}>
                        <CardMedia className={classes.cardMedia}
                                   image={`${card.cover_url}`}
                                   title={card.title}
                        />
                    </div>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.topDescription}>
                            <Typography variant="h6" component='p' align="center" className={classes.price}>
                                {card.price} {card.currency === 'PLN' ? 'zł' : card.currency}
                            </Typography>
                            <Typography variant="h6" component='p' align="center" className={classes.pages}>
                                stron {card.pages}
                            </Typography>
                        </div>
                        <Typography variant="h6" component='h3' align="center" className={classes.title}>
                            {card.title}
                        </Typography>
                        <Typography variant="h6" component='p' align="center" className={classes.author}>
                            {card.author}
                        </Typography>
                        <IconButton
                            onClick={()=> onAddItemToBasket(card)}
                            color="primary"
                            className={classes.addBasket}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            </div>)}
        </div>
    )
}


