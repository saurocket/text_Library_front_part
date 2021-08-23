import {Link, useRouteMatch} from "react-router-dom";
import {Box, IconButton, makeStyles,Typography} from "@material-ui/core";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/bookReducer";
import {getBasketItems} from "../../../redux/selectors/basketSelectors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1
    },
    logo: {
        color: 'gray',
        borderBottom: '2px solid gray'
    },
    logoActive: {
        color: 'white',
        borderBottom: '2px solid white'
    },
    basketActive: {
        color: 'white'
    }
}));

type  PropsType = {
    path: string
    label: string
    activeOnlyWhenExact?:boolean
}

export const HeaderLinks:React.FC<PropsType> = ({path, label, activeOnlyWhenExact}) => {

    const classes = useStyles();
    const basket = useSelector(getBasketItems)
    let match = useRouteMatch({
        path: path,
        exact: activeOnlyWhenExact
    })
    const dispatch = useDispatch()
    const handleClick = () => {
        if (path === '/'){
            dispatch(actions.updateQueryStatus({page:1,title:'',author:''}))
        }else{
            return
        }
    }

    return (
        <Link className={match ? classes.logoActive : classes.logo} to={path} onClick={handleClick}>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
            >
                {path === '/' ? <MenuBookIcon/> : <ShoppingCartIcon className={basket ? classes.basketActive : ''}/>}
                <Box ml={1}>
                    <Typography variant="h6" className={classes.title}>{label}</Typography>
                </Box>
            </IconButton>
        </Link>
    )
}