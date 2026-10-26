import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button, Badge } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import Login from './Login'
import logo from './assets/logo.png'
function NavBar () {
  let [showLoginModal, setShowLoginModal] = useState(false)
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [userName, setUserName] = useState('')
  let navigate = useNavigate();
const {products} = useSelector((state) => state.cart)
  useEffect(() => {
      let flag = localStorage.getItem('isLoggedIn')
      if(flag) {
        setIsLoggedIn(true)
        setUserName(localStorage.getItem('name'))
      }
  }, [])
  function goForLogin () {
    setShowLoginModal(true)
  }

  
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="px-2">
          {" "}
          <Navbar.Brand className="fw-bold fs-4">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-middle me-3"
              alt="BookStore Logo"
            />
            APNA BookStore
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#feature">Books</Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
            <Nav.Link href="/myorders" style = {{ color : 'white'}}>My Orders</Nav.Link>

            <Nav.Link
              className="text-white"
              onClick={() => navigate("/cart")}
              style={{ position: "relative" }}
            >
              <i className="bi bi-cart">cart</i>
              {products.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "-8px",
                    fontSize: "0.7rem",
                  }}
                >
                  {products.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
          {isLoggedIn && <span className="text-white">Welcome {userName}</span>}
          {isLoggedIn && (
            <Button variant="danger" className="ms-1">
              Logout
            </Button>
          )}
          {!isLoggedIn && (
            <Button variant="success" className="ms-1" onClick={goForLogin}>
              Login
            </Button>
          )}
        </Container>
      </Navbar>
      {showLoginModal && <Login></Login>}
    </>
  );
}

export default NavBar