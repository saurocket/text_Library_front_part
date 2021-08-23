import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import {Header} from "./Component/Header/Header"
import {PageContainer} from "./Component/assets/PageContainer"
import { MainPage } from './Component/MainPage/MainPage';
import {BasketPage} from "./Component/BasketPage/BasketPage";
import {Footer} from "./Component/Footer/Footer";
import {MoreDetails} from "./Component/MoreDetails/MoreDetails";
import {FinalFrom} from "./Component/FinalForm/FinalForm"

function App() {
    return (
        <>
            <Router>
                <Header/>
                <PageContainer>
                    <Switch>
                        <Route path='/' exact>
                            <MainPage/>
                        </Route>
                        <Route path='/details/:id' exact>
                            <MoreDetails/>
                        </Route>
                        <Route path='/basket' exact>
                            <BasketPage/>
                        </Route>
                        <Route path='/finalForm' exact>
                            <FinalFrom/>
                        </Route>
                        <h1>PAGE 404</h1>
                    </Switch>
                </PageContainer>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
