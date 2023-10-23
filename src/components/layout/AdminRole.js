import Header from "./Header";
import Footer from './Footer';
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../services/AuthProvider';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import MainNavigation from './MainNavigation';

function AdminRole() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const { token, name, hasAdminRole } = useContext(AuthContext);

    useEffect(() => {
        if (!hasAdminRole()) {
            return <Navigate to="/login" />;
        }
    }, []);

    const handleLogout = () => {
        navigate('/logout');
    }

    return (
        <div>
            {/* <Header /> */}
            <Navbar className='header'>
                <Container>
                    <Navbar.Brand href="/">
                        <img src='/logo.png' alt='Logo' />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <b>{name}</b>
                            <Button variant="warning" className='ms-3' onClick={handleLogout}>
                                Logout
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='main-nav'>
                <Nav defaultActiveKey="/admin/bid-settlement" >
                    <Nav.Item>
                        <Nav.Link href="/admin/bid-settlement" className='item'>BID SETTLEMENT</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="content-div" style={{ marginTop: '60px' }}>{outlet}</div>
            <Footer />
        </div>
    )
}

export default AdminRole;