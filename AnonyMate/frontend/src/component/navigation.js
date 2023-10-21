import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState, useEffect} from 'react'

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('access_token') != null) {
            setIsAuth(true);
        }
    }, [isAuth]);
    return (
        <Navbar className='mynav'>
        <Container>
            <Navbar.Brand href="/"><h2 className="navlinkss" id='logolink'>AnonyMate</h2></Navbar.Brand>
            <Nav className="me-auto">
                    {isAuth ? <Nav.Link href="/"><h2 className="navlinkss">Home</h2></Nav.Link>: null}
                </Nav>
                <Nav>
                    {isAuth ? <Nav.Link href="/logout"><h2 className="navlinkss">Logout</h2></Nav.Link> :
                              <Nav.Link href="/login"><h2 className="navlinkss">Login</h2></Nav.Link>}
            </Nav>
        </Container>
      </Navbar>
      

    );
}
