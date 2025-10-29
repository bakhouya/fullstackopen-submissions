import React from "react";  
import Menu from './components/Menu'
import Footer from './components/Footer'
import { Outlet} from "react-router-dom";
// ======================================================
// component client master where include header and eny pages
// ======================================================
export default function Master() {

    return (          
        <div className="App">
            <Menu />
            <main className="main_app">
              <Outlet />
            </main>
            <Footer />
        </div>
    )
}