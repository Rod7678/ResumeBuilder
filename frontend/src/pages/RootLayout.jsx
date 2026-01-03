import { Outlet } from "react-router";
import Header from "../components/Headers/Header.jsx";

export default function RootLayout(){
    return (
        <>
        <Header />
        <Outlet />
        </>
    )
}