import {Box, Button, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getBasketItems, getTotalItems, getTotalPrice} from "../../../redux/selectors/basketSelectors";
import {actions} from "../../../redux/basketReducer";


const useStyle = makeStyles((theme: Theme) => ({
    buttonWrapper: {
        textAlign: 'right',
        marginTop: theme.spacing(2)
    }
}))

export const BasketSummery = () => {
    const total = useSelector(getTotalPrice)
    const items = useSelector(getTotalItems)
    const basket = useSelector(getBasketItems)
    const dispatch = useDispatch()
    const history = useHistory()
    const onBack = () => {
        history.push('/')
    }
    const onForm = () => {
        if (!basket) return
        dispatch(actions.orderGeneration(basket))
        history.push('/finalForm')
    }
    const classes = useStyle()
    return <div>
        <div>
            <Typography variant="h6" component='p' align="right">
                <b>Suma:</b> {total} zł
            </Typography>
            <Typography variant="h6" component='p' align="right">
                <b>Ilość produktów:</b> {items} szt.
            </Typography>
        </div>
        <div className={classes.buttonWrapper}>
            <Box component="span" m={2}>
                <Button
                    onClick={onBack}
                    variant='contained'
                    size='small'
                    color='primary'
                >
                    powrót
                </Button>
            </Box>

            <Button
                onClick={onForm}
                variant='contained'
                size='small'
                color='secondary'
            >
                dalej
            </Button>

        </div>
    </div>

}