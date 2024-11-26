import { createBrowserRouter } from "react-router-dom";
import * as uiScreens from "../Ui/Screens/index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <uiScreens.TravelRequest/>
    }
]);