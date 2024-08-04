import { createBrowserRouter } from "react-router-dom";
import Main from "./components/main";
import Controller from "./components/controller/Controller";
import ModuleDisplay from "./components/modules/ModuleDisplay";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
              path: "/",
                element: <ModuleDisplay />
            },
            {
                path: "/controller",
                element: <Controller />,
            }
        ]
    },
]);

export default Routes;
