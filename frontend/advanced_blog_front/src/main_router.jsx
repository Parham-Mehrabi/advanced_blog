import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import BaseUrl from "./contexts/url_context.jsx";
import App from './App.jsx'
import NotFound from './errors/404.jsx'
import Home from './components/home.jsx'
import Categories from './components/category.jsx'
import CategoryDetails from "./components/category_details.jsx";
import Login from './components/auth/login.jsx'
import {AuthStatusProvider} from "./contexts/auth_status.jsx";

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={'/'} element={
                <BaseUrl.Provider value={'http://0.0.0.0:8000/'}>
                    <AuthStatusProvider>
                        <App/>
                    </AuthStatusProvider>
                </BaseUrl.Provider>
            }>

                <Route index element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/category' element={<Categories/>}>
                    <Route path={'/category/:id'} element={<CategoryDetails/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>

            </Route>
        )
    )
;

export default router
