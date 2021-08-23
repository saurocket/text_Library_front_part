import React from "react";

import {useSelector} from "react-redux";
import {getBasketItems} from "../../redux/selectors/basketSelectors";
import {BasketItems} from "./BasketItems/BaskteItems";
import {Box, Button, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";



export const BasketPage:React.FC = () => {
    const history = useHistory()
    const basket = useSelector(getBasketItems)
    return (
            <section>
                {basket ?
                    <BasketItems data={basket}/>
                :
                    <div style={{textAlign:'center'}}>
                        <Typography variant="h4" component='h3' align="center">
                            Koszyk na razie pusty
                        </Typography>
                        <Button
                            onClick={() => history.push('/')}
                            variant='contained'
                            size='small'
                            color='secondary'
                        >
                            powrót
                        </Button>
                    </div>
                }
        </section>
    )
}
