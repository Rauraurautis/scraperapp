import { Outlet, createBrowserRouter } from "react-router-dom"
import ToriComponent from "../components/tori/ToriComponent";
import ToriPage from "../pages/ToriPage";
import RoulettePage from "../pages/RoulettePage";

const Layout = () => {
    return (
        <div className="bg-slate-900 w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <Outlet />
        </div>
    )
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <h1>Error</h1>,
        children: [
            {
                path: "/",
                element: <ToriPage />,
                loader: ({ params }) => { return { test: params.id } }
            },
            {
                path: "/roulette",
                element: <RoulettePage />
            }
        ]
    }


]);