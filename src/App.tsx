import React from "react";
import "./App.css";
import { createBrowserRouter, Route, RouterProvider, Routes, ScrollRestoration } from "react-router-dom";
import Home from "./containers/Home/Home";
import About from "./containers/About/About";
import NoMatch from "./containers/NoMatch/NoMatch";
import ManageHouses from "./containers/ManageHouses/ManageHouses";

const router = createBrowserRouter([{ path: "*", Component: Root, errorElement: true }]);

function Root() {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="about/:tableName" element={<About />} />
                    <Route path="manage/houses" element={<ManageHouses />} />

                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
            <ScrollRestoration />
        </>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
