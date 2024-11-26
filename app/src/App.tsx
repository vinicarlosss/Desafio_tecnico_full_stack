import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./Router";
import { DataProvider } from "./Context/DataContext";

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
