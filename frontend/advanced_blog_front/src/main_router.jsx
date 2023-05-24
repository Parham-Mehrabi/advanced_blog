import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import App from './App.jsx'
import NotFound from './errors/404.jsx'
import Home from './components/home.jsx'
import Categories from './components/category.jsx'
import CategoryDetails from "./components/category_details.jsx";

const router = createBrowserRouter(
        createRoutesFromElements(
        <Route path={'/'} element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path='/category' element={<Categories/>}>
                <Route path={'/category/:id'} element={<CategoryDetails/>}/>
            </Route>
            <Route path='*' element={<NotFound/>} />
        </Route>
    )
);

export default router
