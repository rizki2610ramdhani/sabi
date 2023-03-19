import { Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api'
import toRupiah from '../components/utils/ToRupiah';
import  { useState } from "react"

export default function Cart() {

    let { data: carts } = useQuery('cartsCache', async () => {
        const response = await API.get('/carts');
        return response.data.data;
    });

    const [c, setC] = useState(1)

    const setAdd = () => {
        setC(c + 1)
    }

    const setLess = () => {
        if (c <= 1) {
            return c
        }else{
            setC(c - 1)
        }
    }

    async function createTransaction(productId, price, qty) {
        console.log(productId)
        console.log(price)
        console.log(qty)
    }

    return (
        <Container>
            <h3 className="all-title-text">My Cart</h3>
            <span className="all-text-color-brown">Review Your Order</span>
            <Row>
                <Col md={8}>
                    <hr />
                    {carts?.length != 0 &&
                        carts?.map((item, index) => (
                                <Row key={index}>
                                    <Col md={2}>
                                        <img src={item.product.image} alt="product" className='img-fluid' />
                                    </Col>
                                    <Col md={10} className='pt-3'>
                                        <Row className="py-2">
                                            <Col>
                                                <span className="all-title-text">{item.product.product_name}</span>
                                            </Col>
                                            <Col style={{ textAlign: "end" }}>
                                                <span className="all-text-color-brown">{toRupiah(item.product.price)}</span>
                                            </Col>
                                        </Row>
                                        <Row className="py-2">
                                            <Col>
                                                <span className="all-text-color-brown">
                                                    <button className="crt-btn-action-count" onClick={setLess}>-  </button>
                                                    <span className="crt-count">{c}</span>
                                                    <button className="crt-btn-action-count" onClick={setAdd}>  +</button>
                                                </span>
                                            </Col>
                                            <Col style={{ textAlign: "end" }}>
                                                <Link onClick={() => createTransaction(item.product.id, item.product.price, c)}><img src={process.env.PUBLIC_URL + "images/pay.png"} alt="trash" style={{ width: "25px" }} /></Link>   <Link><img src={process.env.PUBLIC_URL + "images/trash.png"} alt="trash" style={{ width: "25px" }} /></Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                        ))
                    }
                    <hr />
                </Col>
                <Col md={4}>
                    <hr />
                    <Row>
                        <Col>
                            <span className="all-text-color-brown">Subtotal</span>
                        </Col>
                        <Col style={{ textAlign: "end" }}>
                            <span className="all-text-color-brown">
                               Rp 120.000 
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span className="all-text-color-brown">Qty</span>
                        </Col>
                        <Col style={{ textAlign: "end" }}>
                            <span className="all-text-color-brown">
                               1
                            </span>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <span className="all-text-color-brown crt-text-total">Total</span>
                        </Col>
                        <Col style={{ textAlign: "end" }}>
                            <span className="all-text-color-brown crt-text-total">Rp.200.000</span>
                        </Col>
                    </Row>
                    <Link style={{ textDecoration: "none" }}>
                        <div className="crt-pay-btn">
                            Pay
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}