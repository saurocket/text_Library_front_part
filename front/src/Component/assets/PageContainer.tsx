import {Container, makeStyles} from "@material-ui/core";
import React, {ReactChild, ReactChildren} from "react";

const useStyle = makeStyles((theme) => ({
    mainContent: {
        color: 'black',
        marginTop: theme.spacing(10),
    },
    cardGrid: {
        marginTop: theme.spacing(4),
    },
}))
type PropsType = {
    children: ReactChild | ReactChildren
}

export const PageContainer:React.FC<PropsType>= ({children}) => {
    const classes = useStyle()
    return (
        <main className={classes.mainContent}>
            <Container className={classes.cardGrid} maxWidth="md">
                {children}
            </Container>
        </main>
    )
}