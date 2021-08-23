import React from "react";
import {Typography,} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
        footerContainer: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            marginTop: 'auto',
        }
    })
)
export const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footerContainer} >
            <div>
                <Typography
                    align="center"
                    color="textSecondary"
                    component="p"
                    variant="subtitle1">
                    Yauheni Luzakou
                </Typography>
            </div>
        </footer>
    )
}
