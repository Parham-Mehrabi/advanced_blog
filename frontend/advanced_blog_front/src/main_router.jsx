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
import LogOut from "./components/auth/logout.jsx";
import Register from "./components/auth/register.jsx";
import Blogs from './components/blogs/blogs.jsx'
import BlogDetails from './components/blogs/blog_details.jsx'


const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={'/'} element={
                <BaseUrl.Provider value={'/back/'}>
                    <AuthStatusProvider>
                        <App/>
                    </AuthStatusProvider>
                </BaseUrl.Provider>
            }>
                <Route index element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<LogOut/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/category' element={<Categories/>}>
                    <Route path={':id'} element={<CategoryDetails/>}/>
                </Route>
                <Route path='/blogs' >
                    <Route index element={<Blogs/>} />
                    <Route path={':id'} element={<BlogDetails/>} />
                </Route>
                <Route path='*' element={<NotFound/>}/>

            </Route>
        )
    )
;

export default router
