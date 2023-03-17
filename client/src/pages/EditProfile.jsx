import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from 'react-query';
import { API } from '../config/api';
import Swal from 'sweetalert2'
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';


export default function ProductEdit() {

    const [state] = useContext(UserContext);

    let navigate = useNavigate();

    //get product id
    let { id } = useParams();

    if (id != state.user.id){
        Swal.fire({
            title: 'Error!',
            text: 'Access denied',
            icon: 'error',
            confirmButtonText: 'Kembali'
        })
        navigate('/profile');
    }

    const [isLoading, setIsLoading] = useState(true);
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
        name: '',
        email: '',
        photo: '',
    }); //Store product data

    async function getDataUpdate() {
        const response = await API.get('/user/' + id);
        setPreview(response.data.data.photo);
        setForm({
            ...form,
            name: response.data.data.name,
            email: response.data.data.email,
            photo: response.data.data.photo,
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
            if (form.photo) {
                formData.set('photo', form?.photo[0], form?.photo[0]?.name);
            }
            formData.set('name', form.name);
            formData.set('email', form.email);

            const response = await API.patch(
                '/user/' + id,
                formData,
                config
            );
            console.log(response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Account berhasil diedit',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })
            navigate(`/profile`)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Account gagal diedit',
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
                    <h3 className="all-title-text">Edit Product</h3>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control name="name" onChange={handleChange} value={form?.name} className='all-input-form' type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicemail">
                            <Form.Control readOnly name="email" value={form?.email} className='all-input-form' type="text" placeholder="email" min={0} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3 d-flex">
                            <Form.Control name="photo" onChange={handleChange} type="file" className="all-input-form" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='all-btn-submit'>
                            Edit Account
                        </Button>
                    </Form>
                </Col>
                {preview && (
                    <Col md={5} style={{ textAlign: "center" }} className="py-2 px-5">
                        <img src={preview} alt="user" className='img-fluid my-3' style={{ width: "90%" }} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}