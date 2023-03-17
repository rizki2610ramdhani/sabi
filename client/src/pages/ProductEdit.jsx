import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from 'react-query';
import { API } from '../config/api';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function ProductEdit() {

    let navigate = useNavigate();

    //get product id
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
        product_name: '',
        price: '',
        stock: '',
        desc: '',
        image: '',
    }); //Store product data

    async function getDataUpdate() {
        const response = await API.get('/product/' + id);
        setPreview(response.data.data.image);
        setForm({
            ...form,
            product_name: response.data.data.product_name,
            price: response.data.data.price,
            stock: response.data.data.stock,
            desc: response.data.data.desc,
        });
        setIsLoading(false)
    }


    useEffect(() => {
        getDataUpdate()
    }, []);

    // Handle change data on form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            // Store data with FormData as object
            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('product_name', form.product_name);
            formData.set('desc', form.desc);
            formData.set('price', form.price);
            formData.set('stock', form.stock);

            const response = await API.patch(
                '/product/' + id,
                formData,
                config
            );
            console.log(response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Product berhasil diedit',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })
            navigate(`/product-detail/${id}`)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Product gagal diedit',
                icon: 'error',
                confirmButtonText: 'Kembali'
            })
            console.log(error);
        }
    });


    return (
        <Container>
            <Row>
                <Col md={7} className="py-2 px-5">
                    <h3 className="all-title-text">Add Product</h3>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control name="product_name" onChange={handleChange} value={form?.product_name} className='all-input-form' type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStock">
                            <Form.Control name="stock" onChange={handleChange} value={form?.stock} className='all-input-form' type="number" placeholder="Stock" min={0} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Control name="price" onChange={handleChange} value={form?.price} className='all-input-form' type="number" placeholder="Price" min={0} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Control
                                name="desc" onChange={handleChange}
                                as="textarea"
                                value={form?.desc}
                                placeholder="Description"
                                className="all-input-form"
                                style={{ height: '100px' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3 d-flex">
                            <Form.Control name="image" onChange={handleChange} type="file" className="all-input-form" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='all-btn-submit'>
                            Edit Product
                        </Button>
                    </Form>
                </Col>
                {preview && (
                    <Col md={5} style={{ textAlign: "center" }} className="py-2 px-5">
                        <img src={preview} alt="product" className='img-fluid my-3' style={{ width: "90%" }} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}