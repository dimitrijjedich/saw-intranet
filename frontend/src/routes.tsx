import { createBrowserRouter } from "react-router-dom";
import Main from "./components/main";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
]);

export default Routes;
