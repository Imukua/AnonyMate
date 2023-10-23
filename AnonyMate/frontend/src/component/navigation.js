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
        {isAuth ? null:<section className="wrapper" >
        <div className="top" >AnonyMate</div>
        <div className="bottom facncy" aria-hidden="true">Anonymate</div>
        </section>}
            <Nav className="me-auto">
                    {isAuth ? <Nav.Link href="/"><h2 className="navlinkss">Home</h2></Nav.Link>: null}
                    
                </Nav>
                <Nav className='far-end'>
                    <Nav.Link href="/about"><h2 className="navlinkss btn btn-secondary">About</h2></Nav.Link>
                    <Nav.Link href="/contact"><h2 className="navlinkss btn btn-secondary">Contact</h2></Nav.Link>
                    {isAuth ? <Nav.Link href="/logout"><h2 className="navlinkss btn btn-primary">Logout</h2></Nav.Link> :
                              <Nav.Link href="/login"><h2 className="navlinkss btn btn-primary">Login</h2></Nav.Link>}
            </Nav>
                
        </Container>
      </Navbar>
      

    );
}
