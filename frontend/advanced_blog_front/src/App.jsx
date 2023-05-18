import Navbar from "./components/navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Outlet} from "react-router-dom";


function App() {

    return (
        <>
            <Navbar/>
            <div className="sidebar">
            {/*    Navbar    */}
            </div>
            <div className="container">
                <Outlet/>
            </div>
        </>
    )
}

export default App
