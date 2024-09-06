import { Outlet } from "react-router-dom"
import NavBar from "../components/headers/NavBar"
import Footer from "../components/Footer"


const MainLayout = () => {
    return (
        <main className="overflow-hidden">
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default MainLayout