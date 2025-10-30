 import HeaderApp from './Navbar'
import Footer from './Footer'
import { Outlet} from "react-router-dom";
import {Container } from 'react-bootstrap';
import SidbarApp from './Sidbar';
// ======================================================
// component client master where include header and eny pages
// ======================================================
export default function Main() {

    return (          
        <div className="App">
            <HeaderApp />
            <main className="py-4">
                <Container>
                    <Outlet /> 
                </Container>
            </main>
            <footer className="text-center text-muted py-3 footer_app mt-5">
                <Container>
                    <Footer />
                </Container>
            </footer>
        </div>
    )
}

