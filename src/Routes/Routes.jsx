import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router";
import App from '../App';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import Home from '../Components/Home/Home';
import Apps from '../Components/Apps/Apps';
import AppFullDetails from '../Components/AppFullDetails/AppFullDetails';
import Installation from '../Components/Installation/Installation';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        {index: true, Component: Home},
        { path: '*', Component: ErrorPage},
        { path: 'apps', Component: Apps},
        { path: '/apps/:id', Component: AppFullDetails},
        { path: '/installation', Component: Installation}
    ]
  },
]);