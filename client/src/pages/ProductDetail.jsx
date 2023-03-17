import { Container, Row, Col } from 'react-bootstrap'
import { API } from '../config/api';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import toRupiah from '../components/utils/ToRupiah';
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Swal from 'sweetalert2'

export default function ProductDetail() {

    //get product
    let { id } = useParams();
    let { data: product } = useQuery('productDetailCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    //get user status
    const [state] = useContext(UserContext);

    //message error auth
    const msgErrorAuth = () => {
        Swal.fire({
            title: 'Error!',
            text: 'Anda harus login terlebih dahulu',
            icon: 'error',
            confirmButtonText: 'Kembali'
        })
    }

    return (
        <Container>
            <Row>
                <Col md={4} sm={12}>
                    <img src={product?.image} className='img-fluid' alt='product' />
                </Col>
                <Col md={8} sm={12}>
                    <div className='my-4'>
                        <h1 className='all-title-text'>{product?.product_name}</h1>
                        <span className='all-text-color-light-brown'>Stock : {product?.stock}</span>
                        <p className='pd-desc-text'>
                            {product?.desc}
                        </p>
                        <h5 className='pd-price-text'>{toRupiah(product?.price)}</h5>
                        {state.isLogin ?
                            state.user.role === "admin" ?
                                <Link to={"/product-edit/" + product?.id} className='all-text-decoration-none'>
                                    <div className='pd-add-cart'>
                                        Edit Product
                                    </div>
                                </Link>
                                :
                                <Link className='all-text-decoration-none'>
                                    <div className='pd-add-cart'>
                                        Add Cart
                                    </div>
                                </Link>
                            :
                            <Link onClick={msgErrorAuth} className='all-text-decoration-none'>
                                <div className='pd-add-cart'>
                                    Add Cart
                                </div>
                            </Link>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}