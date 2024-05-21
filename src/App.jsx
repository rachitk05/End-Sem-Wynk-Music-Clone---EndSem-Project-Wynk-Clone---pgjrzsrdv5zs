import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./HomePage.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import {AuthProvider} from "@/Components/AuthContext.jsx";

const router = createBrowserRouter([
    {
        path: "/", element: <HomePage/>,
    },
    {
        path:"/signup",element:<Signup/>
    },
    {
        path:"/login",element:<Login/>
    }]);
function App() {

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </  AuthProvider>
        );
}

export default App
