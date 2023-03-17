import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ModalRegister from './ModalRegister';
import ModalLogin from './ModalLogin';
import Swal from 'sweetalert2'

export default function Navigation() {

    const [state] = useContext(UserContext);
    const [_, dispatch] = useContext(UserContext);

    const path = "http://localhost:5000/uploads/"

    const logout = () => {
        Swal.fire({
            title: 'Anda ingin keluar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "LOGOUT"
                })
                Swal.fire(
                    'Success!',
                    'Anda berhasil logout.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className='nav-style'>
                <Container>
                    <Link to="/" className='navbar-brand'>
                        <img src={process.env.PUBLIC_URL + "images/nav/Icon.png"} className='nav-icon' alt='icon' />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {state.isLogin ?
                                <>
                                    {state.user.role === "admin" ?
                                        <>

                                        </>
                                        :
                                        <>
                                            <Link to='/cart'>
                                                <h6 className="position-relative d-inline-flex align-items-center">
                                                    <img
                                                        src={process.env.PUBLIC_URL + "images/nav/cart.png"}
                                                        alt="cart"
                                                        className='nav-cart-icon'
                                                    />
                                                    <Badge
                                                        pill
                                                        bg="danger"
                                                        style={{ position: "absolute", top: 0, right: 0 }}
                                                    >

                                                        1

                                                    </Badge>
                                                </h6>
                                            </Link>
                                        </>
                                    }

                                    <div className="dropdown">
                                        <span className="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            {state.user.photo == "" ?
                                                <img src={process.env.PUBLIC_URL + "images/nav/profile.png"} className='nav-profile-image' alt="profile" />
                                                :
                                                <img src={path + state.user.photo} className='nav-profile-image' alt="profile" />
                                            }
                                        </span>
                                        <ul className="dropdown-menu">
                                            {state.user.role === "admin" ?
                                                <>
                                                    <li><Link to="/product-create" className="dropdown-item"><img alt='icon' src={process.env.PUBLIC_URL + "images/nav/dd-icon.png"} className="nav-dropdown-img" /> Add Product</Link></li>
                                                    <li><Link to="/list-product" className="dropdown-item"><img alt='icon' src={process.env.PUBLIC_URL + "images/nav/dd-icon.png"} className="nav-dropdown-img" /> List Product</Link></li>
                                                </>
                                                :
                                                <>

                                                </>
                                            }
                                            <li><Link to='/Profile' className="dropdown-item"><img alt='icon' src={process.env.PUBLIC_URL + "images/nav/dd-profile.png"} className="nav-dropdown-img" /> Profile</Link></li>
                                            <li><Link onClick={logout} to="/" className="dropdown-item"><img alt='icon' src={process.env.PUBLIC_URL + "images/nav/logout.png"} className="nav-dropdown-img" /> Logout</Link></li>
                                        </ul>
                                    </div>
                                </>
                                :
                                <>
                                    <ModalLogin />
                                    <ModalRegister />
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}