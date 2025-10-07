import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router";
import App from '../App';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);