import { Container, Row, Col } from "react-bootstrap";
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

export default function Profile() {

    const [state] = useContext(UserContext);

    return (
        <Container>
            <Row>
                <Col md={5} xs={12}>
                    <Row>
                        <h3 className="all-title-text">My Profile</h3>
                        <Col md={4}>
                            {state.user.photo != "" ?
                                <img src={`http://localhost:5000/uploads/${state.user.photo}`} className='img-fluid' alt='product' />
                                :
                                <img src={process.env.PUBLIC_URL + "images/nav/profile.png"} className='img-fluid' alt='product' />
                            }
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={12} className="py-3">
                                    <strong className="title-text">Full Name</strong>
                                    <br />
                                    <span>{state.user.name}</span>
                                </Col>
                                <Col md={12} className="py-3">
                                    <strong className="title-text">Email</strong>
                                    <br />
                                    <span>{state.user.email}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Link to={"/edit-profile/" + state.user.id} className="text-center pr-btn-edit">
                        <div className='all-btn-submit pr-div-edit mt-2'>
                            Edit Profile
                        </div>
                    </Link>
                </Col>
                <Col md={7} xs={12}>
                    {
                        state.user.role === "admin" ?
                            <>
                                <h3 className="all-title-text">Transaction Info</h3>
                                <span>Click <Link to="/income-transaction" className="md-btn-modal"><b><u>HERE</u></b></Link> to see Income Transaction</span>
                                <br />
                                <span>Click <Link to="/list-product" className="md-btn-modal"><b><u>HERE</u></b></Link> to see List Product</span>
                            </>
                            :
                            <>
                                <h3 className="all-title-text">My Transaction</h3>
                                {/* looping from here */}
                                <Row style={{ backgroundColor: "#F6E6DA" }} className="m-2">
                                    <Col md={3} className="py-4">
                                        <img src={process.env.PUBLIC_URL + "/images/products/nicaragua.png"} className='img-fluid' alt='product' />
                                    </Col>
                                    <Col md={6} className="py-5">
                                        <div>
                                            <strong className="title-text">NICARAGUA Beans</strong>
                                            <br />
                                            <span style={{ color: "#613D2B" }}><b>Saturday</b>, 5 march 2021</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-color">Price : Rp.200.000</span>
                                            <br />
                                            <span className="text-color">Qty : 2</span>
                                            <br />
                                            <strong className="text-color">Sub Total : Rp.400.000</strong>
                                        </div>
                                    </Col>
                                    <Col md={3} className="py-4 text-center">
                                        <img src={process.env.PUBLIC_URL + "/images/icon.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <img src={process.env.PUBLIC_URL + "/images/qr.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <br />
                                        <div className="mt-1">
                                            <span style={{ padding: "2px 8px", color: "#23963a", backgroundColor: "#97f0a9" }}>Success</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "#F6E6DA" }} className="m-2">
                                    <Col md={3} className="py-4">
                                        <img src={process.env.PUBLIC_URL + "/images/products/nicaragua.png"} className='img-fluid' alt='product' />
                                    </Col>
                                    <Col md={6} className="py-5">
                                        <div>
                                            <strong className="title-text">NICARAGUA Beans</strong>
                                            <br />
                                            <span style={{ color: "#613D2B" }}><b>Saturday</b>, 5 march 2021</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-color">Price : Rp.200.000</span>
                                            <br />
                                            <span className="text-color">Qty : 2</span>
                                            <br />
                                            <strong className="text-color">Sub Total : Rp.400.000</strong>
                                        </div>
                                    </Col>
                                    <Col md={3} className="py-4 text-center">
                                        <img src={process.env.PUBLIC_URL + "/images/icon.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <img src={process.env.PUBLIC_URL + "/images/qr.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <br />
                                        <div className="mt-1">
                                            <span style={{ padding: "2px 8px", color: "#23963a", backgroundColor: "#97f0a9" }}>Success</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "#F6E6DA" }} className="m-2">
                                    <Col md={3} className="py-4">
                                        <img src={process.env.PUBLIC_URL + "/images/products/nicaragua.png"} className='img-fluid' alt='product' />
                                    </Col>
                                    <Col md={6} className="py-5">
                                        <div>
                                            <strong className="title-text">NICARAGUA Beans</strong>
                                            <br />
                                            <span style={{ color: "#613D2B" }}><b>Saturday</b>, 5 march 2021</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-color">Price : Rp.200.000</span>
                                            <br />
                                            <span className="text-color">Qty : 2</span>
                                            <br />
                                            <strong className="text-color">Sub Total : Rp.400.000</strong>
                                        </div>
                                    </Col>
                                    <Col md={3} className="py-4 text-center">
                                        <img src={process.env.PUBLIC_URL + "/images/icon.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <img src={process.env.PUBLIC_URL + "/images/qr.png"} className='img-fluid my-1' alt='product' style={{ width: "60%" }} />
                                        <br />
                                        <div className="mt-1">
                                            <span style={{ padding: "2px 8px", color: "#23963a", backgroundColor: "#97f0a9" }}>Success</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                    }
                </Col>
            </Row>
        </Container>
    )
}