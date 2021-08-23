import React, {useEffect} from "react";
import {AppBar, Container, makeStyles, Toolbar} from "@material-ui/core/";
import {HeaderLinks} from "./HeaderLinks/HeaderLinks";
import {useSelector} from "react-redux";
import {getErrors} from "../../redux/selectors/mainSelectors";
import Swal from "sweetalert2";
const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))
export const Header: React.FC = () => {
    const classes = useStyle()
    const getError = useSelector(getErrors)
    useEffect(()=> {
        if(getError){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: getError,
            })
            return
        }

    },[getError])
    return (
        <header>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar className={classes.root}>
                        <HeaderLinks path={'/'} label={'Książki'} activeOnlyWhenExact={true}/>
                        <HeaderLinks path={'/basket'} label={'Koszyk'}/>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}


