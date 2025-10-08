import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router";
import App from '../App';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import Home from '../Components/Home/Home';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        {index: true, Component: Home},
        { path: '*', Component: ErrorPage}
    ]
  },
]);